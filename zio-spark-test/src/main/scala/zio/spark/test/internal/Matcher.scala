package zio.spark.test.internal

import org.apache.spark.sql.Row
import org.apache.spark.sql.types.StructType

import zio.spark.test.internal.ValueMatcher.{GlobalValueMatcher, PositionalValueMatcher}

sealed trait Matcher {
  import Matcher.RowMatcher._

  def process[T](current: T, maybeSchema: Option[StructType]): Boolean =
    this match {
      case PositionalRowMatcher(matchers, _) =>
        current match {
          case current: Row =>
            if (matchers.length == current.length)
              matchers.zip(current.toSeq).forall { case (matcher, value) => matcher.process(value, maybeSchema) }
            else ??? // ERROR
          case _: T =>
            if (matchers.length == 1) matchers.head.process(current, maybeSchema)
            else ??? // ERROR
          case _ => ??? // ERROR
        }
      case GlobalRowMatcher(matchers, _) =>
        matchers.exists(_.process(current, maybeSchema))
    }
}

object Matcher {
  case object SchemaMatcher extends Matcher
  sealed trait RowMatcher extends Matcher {
    def isUnique: Boolean

    def allowMultipleMatches: RowMatcher
  }

  object RowMatcher {
    final case class PositionalRowMatcher(
        matchers: Seq[PositionalValueMatcher],
        isUnique: Boolean
    ) extends RowMatcher {
      override def allowMultipleMatches: RowMatcher = copy(isUnique = false)
    }

    final case class GlobalRowMatcher(
        matchers: Seq[GlobalValueMatcher],
        isUnique: Boolean
    ) extends RowMatcher {
      override def allowMultipleMatches: RowMatcher = copy(isUnique = false)
    }
  }
}
