package zio.spark.codegen.generation.template.instance

import zio.spark.codegen.ScalaBinaryVersion
import zio.spark.codegen.generation.MethodType
import zio.spark.codegen.generation.template.{Helper, Template}
import zio.spark.codegen.generation.template.Helper.*
import zio.spark.codegen.structure.Method

case object SparkContextTemplate extends Template.Default {
  override def name: String = "SparkContext"

  override def imports(scalaVersion: ScalaBinaryVersion): Option[String] =
    Some {
      """
        |import zio._
        |import zio.spark.rdd.RDD
        |
        |import org.apache.hadoop.conf.Configuration
        |import org.apache.hadoop.mapred.{InputFormat, JobConf}
        |import org.apache.hadoop.mapreduce.{InputFormat => NewInputFormat}
        |import org.apache.spark.broadcast.Broadcast
        |import org.apache.spark.input.PortableDataStream
        |import org.apache.spark.resource._
        |import org.apache.spark.scheduler.SchedulingMode.SchedulingMode
        |import org.apache.spark.util._
        |import org.apache.spark.{SimpleFutureAction, SparkConf, SparkStatusTracker, TaskContext, SparkContext => UnderlyingSparkContext}
        |import org.apache.spark.rdd.{RDD => UnderlyingRDD}
        |
        |import scala.reflect.ClassTag
        |""".stripMargin
    }

  override def implicits(scalaVersion: ScalaBinaryVersion): Option[String] =
    Some {
      s"""private implicit def lift[U](x:UnderlyingRDD[U]):RDD[U] =
         |  RDD(x)
         |private implicit def liftMap[K, V](map: scala.collection.Map[K, V]): Map[K, V] =
         |  map.toMap""".stripMargin
    }

  override def helpers: Helper = action && get

  override def annotations(scalaVersion: ScalaBinaryVersion): Option[String] =
    Some("@SuppressWarnings(Array(\"scalafix:DisableSyntax.defaultArgs\"))")

  private def isAction(method: Method): Boolean = {
    val actions = Set(
      "addArchive",
      "addFile",
      "addJar",
      "binaryFiles",
      "binaryRecords",
      "cancelAllJobs",
      "cancelJob",
      "cancelStage",
      "clearCallSite",
      "clearJobGroup",
      "broadcast",
      "hadoopFile",
      "hadoopRDD",
      "killTaskAttempt",
      "runJob"
    )

    actions(method.name)
  }

  override def getMethodType(method: Method): MethodType = method match {
    case _ if isAction(method) => MethodType.DriverAction
    case _ if method.name == "sequenceFile" => MethodType.Ignored
    case _ if method.name == "getPersistentRDDs" => MethodType.ToImplement
    case _ => MethodType.Get
  }
}
