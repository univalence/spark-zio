package zio.spark.sql

import org.apache.spark.sql.{DataFrame => UnderlyingDataFrame, DataFrameReader => UnderlyingDataFrameReader}

final case class DataFrameReader(extraOptions: Map[String, String] = Map()) {

  /**
   * Loads a dataframe from a CSV file.
   *
   * See [[UnderlyingDataFrameReader.csv]] for more information.
   */
  def csv(path: String): Spark[DataFrame] = loadUsing(_.csv(path))

  /** Loads a dataframe using one of the dataframe loader. */
  def loadUsing(f: UnderlyingDataFrameReader => UnderlyingDataFrame): Spark[DataFrame] =
    fromSpark(ss => Dataset(f(ss.read.options(extraOptions))))

  /** Adds multiple options to the DataFrameReader. */
  def options(options: Map[String, String]): DataFrameReader = copy(extraOptions ++ options)

  /** Adds an option to delimit the column from a csv file. */
  def withDelimiter(delimiter: String): DataFrameReader = option("delimiter", delimiter)

  /** Adds an option to the DataFrameReader. */
  def option(key: String, value: String): DataFrameReader = copy(extraOptions + (key -> value))

  /** Adds an option to say that the file has a header. */
  def withHeader: DataFrameReader = option("header", value = true)

  /** Adds an option to say that spark should infer the schema. */
  def inferSchema: DataFrameReader = option("inferSchema", value = true)

  /** Adds an option to the DataFrameReader. */
  def option(key: String, value: Boolean): DataFrameReader = option(key, value.toString)

  /** Adds an option to the DataFrameReader (for Int). */
  def option(key: String, value: Int): DataFrameReader = option(key, value.toString)

  /** Adds an option to the DataFrameReader (for Float). */
  def option(key: String, value: Float): DataFrameReader = option(key, value.toString)

  /** Adds an option to the DataFrameReader (for Double). */
  def option(key: String, value: Double): DataFrameReader = option(key, value.toString)
}
