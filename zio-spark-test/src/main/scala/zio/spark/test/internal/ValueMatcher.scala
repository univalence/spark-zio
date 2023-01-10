package zio.spark.test.internal

import org.apache.spark.sql.Row
import org.apache.spark.sql.types.StructType

import scala.reflect.ClassTag

sealed trait ValueMatcher {
  import ValueMatcher._
  import ValueMatcher.GlobalValueMatcher
  import ValueMatcher.PositionalValueMatcher

  def process[T](current: T, maybeSchema: Option[StructType]): Boolean =
    this match {
      case matcher: PositionalValueMatcher =>
        matcher match {
          case PositionalValueMatcher.Value(expected) =>
            expected match {
              case expected: Row =>
                current match {
                  case current: Row => expected.toSeq.sameElements(current.toSeq)
                  case _            => false
                }
              case expected: T => current == expected
              case _           => false
            }
          case PositionalValueMatcher.Anything => true
        }
      case matcher: GlobalValueMatcher =>
        matcher match {
          case GlobalValueMatcher.KeyValue(key, expected) =>
            current match {
              case current: Row =>
                maybeSchema match {
                  case Some(schema) => processRow(current, key, expected, schema)
                  case None         => false // There is no schema
                }
              case t: T if key == "value" => current == t // TODO
              case _                      => false
            }
          case GlobalValueMatcher.Predicate(predicate) =>
            predicate match {
              case predicate: (T => Boolean) => predicate(current)
              case _                         => false
            }
          case GlobalValueMatcher.Or(left, right) =>
            left.process(current, maybeSchema) || right.process(current, maybeSchema)
          case GlobalValueMatcher.And(left, right) =>
            left.process(current, maybeSchema) && right.process(current, maybeSchema)
        }
    }

}

object ValueMatcher {
  sealed trait PositionalValueMatcher extends ValueMatcher

  sealed trait GlobalValueMatcher extends ValueMatcher {
    def &&(that: GlobalValueMatcher) = GlobalValueMatcher.And(this, that)

    def ||(that: GlobalValueMatcher) = GlobalValueMatcher.Or(this, that)
  }

  object PositionalValueMatcher {
    final case class Value[T](value: T) extends PositionalValueMatcher
    case object Anything                extends PositionalValueMatcher
  }

  object GlobalValueMatcher {
    final case class KeyValue[T](key: String, value: T)                       extends GlobalValueMatcher
    final case class Predicate[T](predicate: T => Boolean)                    extends GlobalValueMatcher
    final case class Or(left: GlobalValueMatcher, right: GlobalValueMatcher)  extends GlobalValueMatcher
    final case class And(left: GlobalValueMatcher, right: GlobalValueMatcher) extends GlobalValueMatcher
  }

  private def compareUnknownTypes[A, B: ClassTag](a: A, b: B) =
    a match {
      case aAsB: B => aAsB == b
      case _       => false
    }

  private def processRow(row: Row, key: String, value: Any, schema: StructType) =
    schema.zipWithIndex.filter(_._1.name == key).map(_._2).headOption match {
      case Some(pos) =>
        Option(row.get(pos)) match {
          case Some(curr) => compareUnknownTypes(curr, value)
          case None       => false // The row is not large enough
        }
      case None => false // There is no field named $k
    }
}