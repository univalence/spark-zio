package zio.spark.helper

import zio.spark.rdd._
import zio.spark.sql._
import zio.spark.sql.TryAnalysis.syntax.throwAnalysisException
import zio.spark.sql.implicits._

object Fixture {
  final case class Person(name: String, age: Int)

  def readCsv(path: String): Spark[DataFrame] = SparkSession.read.inferSchema.withHeader.withDelimiter(";").csv(path)

  val resourcesPath: String = "zio-spark-core/src/test/resources"

  val targetsPath: String = "zio-spark-core/target/test"

  val read: Spark[DataFrame] = readCsv(s"$resourcesPath/data.csv")

  val readEmpty: Spark[DataFrame] = readCsv(s"$resourcesPath/empty.csv")

  val readLorem: Spark[Dataset[String]] = SparkSession.read.textFile(s"$resourcesPath/lorem.txt")

  val readRDD: Spark[RDD[Person]] = read.map(_.as[Person].rdd)
}