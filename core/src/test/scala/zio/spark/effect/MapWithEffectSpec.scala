package zio.spark.effect

import org.apache.spark.sql.{Dataset => UnderlyingDataset}

import zio.{IO, Task, UIO}
import zio.spark.SparkSessionRunner.session
import zio.spark.rdd.RDD
import zio.spark.sql._
import zio.spark.sql.implicits._
import zio.test._

object MapWithEffectSpec extends DefaultRunnableSpec {
  override def spec: ZSpec[TestEnvironment, Any] =
    suite("smoke")(
      test("basic smoke test") {
        val getRddInt: Spark[RDD[Int]] =
          zio.spark.sql.fromSpark { ss =>
            import ss.implicits._
            val ds: UnderlyingDataset[Int] = Seq(1, 2, 3).toDS()
            ds.zioSpark.rdd
          }

        Seq(1, 2, 3).toDataset.map(_.rdd)

        def effect(rdd: RDD[Int]): Task[Seq[Either[String, Unit]]] =
          MapWithEffect(rdd.map(i => UIO(println(i))))("rejected").collect

        (getRddInt flatMap effect).map(seq => assertTrue(seq.size == 3))
      },
      test("failure") {

        Seq
          .fill(10000)(IO.fail("toto").as(1))
          .toRDD
          .flatMap(rdd => MapWithEffect(rdd)("rejected").collect)
          .map(res =>
            assertTrue(res.size == 10000) &&
              assertTrue(res.count(_ == Left("rejected")) == 8000) &&
              assertTrue(res.indexWhere(_ == Left("rejected")) == 1)
          )

      }
    )
      .provideCustomLayerShared(session)
}
