package zio.spark.sql

import org.apache.spark.sql.{SparkSession => UnderlyingSparkSession}
import org.apache.spark.sql.Sniffer.{getCallSite, sparkContextSetCallSite}

import zio._
import zio.spark.parameter._
import zio.spark.sql.SparkSession.Conf
import zio.spark.util.Utils.zioSparkInternalExclusionFunction

final case class SparkSession(underlyingSparkSession: UnderlyingSparkSession)
    extends ExtraSparkSessionFeature(underlyingSparkSession) {

  /** Closes the current SparkSession. */
  def close(implicit trace: ZTraceElement): Task[Unit] = ZIO.attemptBlocking(underlyingSparkSession.close())

  /** Executes a SQL query using Spark. */
  def sql(sqlText: String)(implicit trace: ZTraceElement): Task[DataFrame] =
    ZIO.attemptBlocking(Dataset(underlyingSparkSession.sql(sqlText)))

  def conf: Conf =
    new Conf {
      override def getAll: UIO[Map[String, String]] = UIO.succeed(underlyingSparkSession.conf.getAll)
    }
}

object SparkSession extends Accessible[SparkSession] {
  trait Conf {
    def getAll: UIO[Map[String, String]]
  }

  /** Creates the DataFrameReader. */
  def read: DataFrameReader = DataFrameReader(Map.empty)

  /**
   * Creates a [[SparkSession.Builder]].
   *
   * See [[UnderlyingSparkSession.builder]] for more information.
   */
  def builder: Builder = Builder(UnderlyingSparkSession.builder(), Map.empty)

  def attempt[Out](f: UnderlyingSparkSession => Out)(implicit trace: ZTraceElement): SIO[Out] =
    ZIO.serviceWithZIO[SparkSession](ss => ZIO.attempt(f(ss.underlyingSparkSession))(trace))

  final case class Builder(
      builder:      UnderlyingSparkSession.Builder,
      extraConfigs: Map[String, String],
      hiveSupport:  Boolean = false
  ) {
    self =>

    /**
     * Transforms the creation of the SparkSession into a managed layer
     * that will open and close the SparkSession when the job is done.
     */
    def asLayer: ZLayer[System with Console, Throwable, SparkSession] = ZLayer.scoped(acquireRelease)

    private def construct: UnderlyingSparkSession.Builder = {
      val configuredBuilder: UnderlyingSparkSession.Builder =
        extraConfigs.foldLeft(builder) { case (oldBuilder, (configKey, configValue)) =>
          oldBuilder.config(configKey, configValue)
        }

      if (hiveSupport) configuredBuilder.enableHiveSupport()
      else configuredBuilder
    }

    /**
     * Unsafely get or create a SparkSession without ensuring that the
     * session will be closed.
     *
     * See [[UnderlyingSparkSession.Builder.getOrCreate]] for more
     * information.
     */
    def getOrCreate(implicit trace: ZTraceElement): ZIO[System with Console, Throwable, SparkSession] =
      for {
        callSite <- getCallSite(zioSparkInternalExclusionFunction)
        ss <-
          Task.attempt {
            val underlying = {
              val sparkSession = self.construct.getOrCreate()
              sparkContextSetCallSite(sparkSession.sparkContext, callSite)
              sparkSession
            }
            SparkSession(underlying)
          }
      } yield ss

    /**
     * Tries to create a spark session.
     *
     * See [[UnderlyingSparkSession.Builder.getOrCreate]] for more
     * information.
     */
    def acquireRelease(implicit trace: ZTraceElement): ZIO[System with Scope with Console, Throwable, SparkSession] =
      ZIO.acquireRelease(getOrCreate)(ss => Task.attempt(ss.close).orDie)

    /** Adds multiple configurations to the Builder. */
    def configs(configs: Map[String, String]): Builder = copy(builder, extraConfigs ++ configs)

    /** Configures the master using a [[Master]]. */
    def master(masterMode: Master): Builder = master(masterMode.toString)

    /** Configures the master using a String. */
    def master(master: String): Builder = config("spark.master", master)

    /** Adds a config to the Builder. */
    def config(key: String, value: String): Builder = copy(builder, extraConfigs + (key -> value))

    /** Configures the application name. */
    def appName(name: String): Builder = config("spark.app.name", name)

    /** Adds an option to the Builder (for Int). */
    def config(key: String, value: Int): Builder = config(key, value.toString)

    /** Adds an option to the Builder (for Float). */
    def config(key: String, value: Float): Builder = config(key, value.toString)

    /** Adds an option to the Builder (for Double). */
    def config(key: String, value: Double): Builder = config(key, value.toString)

    /** Adds an option to the Builder (for Boolean). */
    def config(key: String, value: Boolean): Builder = config(key, value.toString)

    /**
     * Configure the amount of memory to use for the driver process
     * using a String.
     *
     * Note: In client mode, set this through the --driver-memory
     * command line option or in your default properties file.
     */
    def driverMemory(size: Size): Builder = driverMemory(size.toString)

    /**
     * Configure the amount of memory to use for the driver process
     * using a String.
     *
     * Note: In client mode, set this through the --driver-memory
     * command line option or in your default properties file.
     */
    def driverMemory(size: String): Builder = config("spark.driver.memory", size)

    /**
     * Enables Hive support, including connectivity to a persistent Hive
     * metastore, support for Hive serdes, and Hive user-defined
     * functions.
     *
     * @since 2.0.0
     */
    def enableHiveSupport: Builder = copy(hiveSupport = true)
  }
}
