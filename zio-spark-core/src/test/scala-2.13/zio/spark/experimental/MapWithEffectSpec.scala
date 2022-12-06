package zio.spark.experimental

import zio.{Task, ZIO}
import zio.spark.ZioSparkTestSpec.session
import zio.spark.experimental.MapWithEffect.RDDOps
import zio.spark.rdd.RDD
import zio.spark.sql._
import zio.spark.sql.implicits._
import zio.test._

object MapWithEffectSpec extends ZIOSpecDefault {
  override def spec: Spec[TestEnvironment, Any] =
    suite("smoke")(
      test("basic smoke test") {
        val getRddInt: SIO[RDD[Int]] = Seq(1, 2, 3).toRDD

        Seq(1, 2, 3).toDataset.map(_.rdd)

        def effect(rdd: RDD[Int]): Task[Seq[Either[String, Int]]] =
          MapWithEffect(rdd.map(i => ZIO.succeed(i)))("rejected").collect

        (getRddInt flatMap effect).map(seq => assertTrue(seq.size == 3))
      },
      test("failure") {
        Seq
          .fill(10000)(1)
          .toRDD
          .map(_.mapZIO(_ => ZIO.fail("fail").as(1), _ => "rejected"))
          .flatMap(_.collect)
          .map { res =>
            val size  = res.size
            val count = res.count(_ == Left("rejected"))
            val i     = res.indexWhere(_ == Left("rejected"))
            assertTrue(size == 10000, i == 1, count.toDouble < (0.95d * size))
          }
      }
    ).provideCustomLayerShared(session)
}