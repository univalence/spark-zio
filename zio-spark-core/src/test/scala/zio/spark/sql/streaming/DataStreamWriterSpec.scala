package zio.spark.sql.streaming

import zio.durationInt
import zio.spark.sql._
import zio.spark.sql.implicits._
import scala3encoders.given
import zio.test._

object DataStreamWriterSpec {
  val writerEffect: SIO[DataStreamWriter[Int]] = Seq(1).toDataset.map(_.writeStream)

  def testOption(
      testName: String,
      endo: DataStreamWriter[Int] => DataStreamWriter[Int],
      expectedKey: String,
      expectedValue: String
  ): Spec[SparkSession, Throwable] =
    test(s"DataStreamReader can add the option ($testName)") {
      val options = Map(expectedKey -> expectedValue)

      for {
        writer <- writerEffect
        writerWithOptions = endo(writer)
      } yield assertTrue(writerWithOptions.options == options)
    }

  def dataStreamReaderConfigurationsSpec: Spec[SparkSession with Live, Any] =
    suite("DataStreamWriter Configurations")(
      test("DataStreamWriter should apply options correctly") {
        val options = Map("a" -> "x", "b" -> "y")

        for {
          writer <- writerEffect
          writerWithOptions = writer.options(options)
        } yield assertTrue(writerWithOptions.options == options)
      },
      test("DataStreamWriter should apply processing trigger correctly") {
        for {
          writer <- writerEffect
          writerWithOptions = writer.triggerEvery(1.seconds)
        } yield assertTrue(writerWithOptions.trigger.toString.contains("1000"))
      },
      test("DataStreamWriter should apply continuous trigger correctly") {
        for {
          writer <- writerEffect
          writerWithOptions = writer.continuouslyWithCheckpointEvery(1.seconds)
        } yield assertTrue(writerWithOptions.trigger.toString.contains("1000"))
      },
      test("DataStreamWriter should apply partitionColumns correctly") {
        for {
          writer <- writerEffect
          writerWithOptions = writer.partitionBy("test")
        } yield assertTrue(writerWithOptions.partitioningColumns.contains(Seq("test")))
      },
      testOption(
        testName      = "Any option with a boolean value",
        endo          = _.option("a", value = true),
        expectedKey   = "a",
        expectedValue = "true"
      ),
      testOption(
        testName      = "Any option with a int value",
        endo          = _.option("a", 1),
        expectedKey   = "a",
        expectedValue = "1"
      ),
      testOption(
        testName      = "Any option with a float value",
        endo          = _.option("a", 1f),
        expectedKey   = "a",
        expectedValue = "1.0"
      ),
      testOption(
        testName      = "Any option with a double value",
        endo          = _.option("a", 1d),
        expectedKey   = "a",
        expectedValue = "1.0"
      )
    )
}
