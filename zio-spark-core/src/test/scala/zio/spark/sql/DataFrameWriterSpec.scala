package zio.spark.sql

import org.apache.commons.io.FileUtils
import org.apache.spark.sql.{Row, SaveMode}

import zio.{Console, Task}
import zio.spark.helper.Fixture._
import zio.stream.{Sink, ZStream}
import zio.test._
import zio.test.TestAspect._

import java.nio.file.{Files, Paths}

object DataFrameWriterSpec {

  /** Deletes the folder generated by the test. */
  def deleteGeneratedFolder(path: String): Task[Unit] = Task.attempt(FileUtils.deleteDirectory(Paths.get(path).toFile))

  def dataFrameWriterBuilderSpec: Spec[Console with SparkSession, TestFailure[Any], TestSuccess] =
    suite("DataFrameWriter Builder Spec")(
      test("DataFrameWriter can change its mode") {
        val mode         = SaveMode.Overwrite
        val path: String = s"$targetsPath/test/output/dataframe-writer-mode"

        for {
          df <- read
          writer = df.write.mode(mode)
          _ <- writer.csv(path)
          _ <- writer.csv(path)
          _ <- deleteGeneratedFolder(path)
        } yield assertTrue(writer.mode(mode).mode == mode)
      },
      test("DataFrameWriter can change its partitions") {
        val partitionCol: String = "name"
        val path: String         = s"$targetsPath/test/output/dataframe-writer-partitionBy"

        for {
          df <- read
          writer = df.write.partitionBy(partitionCol)
          _     <- writer.csv(path)
          files <- Task.attempt(Files.walk(Paths.get(path)))
          isPartitioned <-
            ZStream
              .fromJavaStream(files)
              .run(Sink.collectAll)
              .map(_.exists(_.getFileName.toString.startsWith(s"$partitionCol=")))
          _ <- deleteGeneratedFolder(path)
        } yield assertTrue(writer.partitioningColumns == Seq(partitionCol)) && assertTrue(isPartitioned)
      }
    )

  def dataFrameWriterSavingSpec: Spec[Annotations with SparkSession, TestFailure[Any], TestSuccess] = {
    def writerTest(extension: String, readAgain: String => SIO[DataFrame], write: String => DataFrame => Task[Unit]) =
      test(s"DataFrameWriter can save a DataFrame to $extension") {
        val path: String = s"$targetsPath/test/output/dataframe-writer-$extension"

        for {
          _      <- read.flatMap(write(path))
          df     <- readAgain(path)
          output <- df.count
          _      <- deleteGeneratedFolder(path)
        } yield assertTrue(output == 4L)

      }

    val tests =
      List(
        writerTest(
          extension = "csv",
          readAgain = path => readCsv(path),
          write     = path => _.write.withHeader.csv(path)
        ),
        // Not working with mac M1 in old version of Spark due to snappy-java:
        // (Caused by: org.xerial.snappy.SnappyError: [FAILED_TO_LOAD_NATIVE_LIBRARY]
        // no native library is found for os.name=Mac and os.arch=aarch64)
        writerTest(
          extension = "parquet",
          readAgain = path => SparkSession.read.parquet(path),
          write     = path => _.write.parquet(path)
        ) @@ scala211(os(!_.isMac)),
        writerTest(
          extension = "json",
          readAgain = path => SparkSession.read.json(path),
          write     = path => _.write.json(path)
        )
      )

    suite("DataFrameWriter Saving Formats")(tests: _*)
  }

  def dataFrameWriterOptionDefinitionsSpec: Spec[SparkSession, TestFailure[Any], TestSuccess] = {
    def writerTest(
        testName: String,
        endo: DataFrameWriter[Row] => DataFrameWriter[Row],
        expectedKey: String,
        expectedValue: String
    ) =
      test(s"DataFrameWriter can add the option ($testName)") {
        for {
          df <- read
          write             = df.write
          writerWithOptions = endo(write)
          options           = Map(expectedKey -> expectedValue)
        } yield assertTrue(writerWithOptions.options == options)
      }

    val tests =
      List(
        writerTest(
          testName      = "Any option with a boolean value",
          endo          = _.option("a", value = true),
          expectedKey   = "a",
          expectedValue = "true"
        ),
        writerTest(
          testName      = "Any option with a int value",
          endo          = _.option("a", 1),
          expectedKey   = "a",
          expectedValue = "1"
        ),
        writerTest(
          testName      = "Any option with a float value",
          endo          = _.option("a", 1f),
          expectedKey   = "a",
          expectedValue = "1.0"
        ),
        writerTest(
          testName      = "Any option with a double value",
          endo          = _.option("a", 1d),
          expectedKey   = "a",
          expectedValue = "1.0"
        ),
        writerTest(
          testName      = "Option that read header",
          endo          = _.withHeader,
          expectedKey   = "header",
          expectedValue = "true"
        ),
        test("DataFrameWriter can add multiple options") {
          val options =
            Map(
              "a" -> "b",
              "c" -> "d"
            )

          for {
            df <- read
            writer = df.write
          } yield assertTrue(writer.options(options).options == options)
        }
      )

    suite("DataFrameWriter Option Definitions")(tests: _*)
  }
}
