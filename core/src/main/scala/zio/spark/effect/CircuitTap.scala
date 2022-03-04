package zio.spark.effect

import zio.{Ref, UIO, ZIO}

import scala.util.{Failure, Success, Try}

/**
 * A `Tap` adjusts the flow of tasks through an external service in
 * response to observed failures in the service, always trying to
 * maximize flow while attempting to meet the user-defined upper bound
 * on failures.
 */
trait CircuitTap[-E1, +E2] {

  /**
   * Sends the task through the tap. The returned task may fail
   * immediately with a default error depending on the service being
   * guarded by the tap.
   */
  def apply[R, E >: E2 <: E1, A](effect: ZIO[R, E, A]): ZIO[R, E, A]

  def getState: UIO[CircuitTap.State]
}

class SmartCircuitTap[-E1, +E2](
    errBound:  Ratio,
    qualified: E1 => Boolean,
    rejected:  => E2,
    state:     Ref[CircuitTap.State]
) extends CircuitTap[E1, E2] {

  override def apply[R, E >: E2 <: E1, A](effect: ZIO[R, E, A]): ZIO[R, E, A] =
    state.get flatMap { s =>
      val tooMuchError: Boolean = s.decayingErrorRatio.ratio.value > errBound.value
      if (tooMuchError) {
        zio.ZRef.UnifiedSyntax(state).update(_.incRejected) *> ZIO.fail(rejected)
      } else {
        run(effect)
      }
    }

  private def run[R, E >: E2 <: E1, A](effect: ZIO[R, E, A]): ZIO[R, E, A] = {
    def tapError(e: E): UIO[Unit] =
      if (qualified(e)) state.update(_.incFailure)
      else state.update(_.incSuccess)

    effect.tapBoth(tapError, _ => state.update(_.incSuccess))
  }

  override def getState: UIO[CircuitTap.State] = state.get
}

/** Value class to represent values between 0.0 and 1.0 */
final class Ratio private (val value: Double) extends AnyVal with Ordered[Ratio] {
  override def compare(that: Ratio): Int = this.value.compareTo(that.value)
  override def toString: String          = value.toString
}
object Ratio {

  implicit val ordering: Ordering[Ratio] = Ordering.by(_.value)

  private def create(value: Double): Ratio = {
    assert(value >= 0.0 && value <= 1)
    new Ratio(value)
  }

  // TODO String context r"0.5" ? or use refined ?
  def apply(n: Double): Try[Ratio] =
    if (n < 0.0 || n > 1)
      Failure(new IllegalArgumentException("A ratio must be between 0.0 and 1.0"))
    else
      Success(new Ratio(n))

  val zero: Ratio = Ratio.create(0.0)
  val full: Ratio = Ratio.create(1.0)

  def mean(w1: Int, r1: Ratio)(w2: Int, r2: Ratio): Ratio = {
    assert(w1 > 0)
    assert(w2 > 0)
    create((r1.value * w1 + r2.value * w2) / (w1 + w2))
  }

}

final case class DecayingRatio(ratio: Ratio, scale: Int) {
  def decay(value: Ratio, maxScale: Long): DecayingRatio =
    DecayingRatio(Ratio.mean(scale, ratio)(1, value), if (scale < maxScale) scale else maxScale.toInt)
}

object CircuitTap {
  final private[spark] case class State(
      failed:             Long,
      success:            Long,
      rejected:           Long,
      decayingErrorRatio: DecayingRatio
  ) {

    def nextErrorRatio(ratio: Ratio): DecayingRatio =
      if (total == 0) DecayingRatio(ratio, decayingErrorRatio.scale)
      else decayingErrorRatio.decay(ratio, total)

    def updateRatio(ratio: Ratio): State = copy(decayingErrorRatio = nextErrorRatio(ratio))

    def total: Long = failed + success + rejected

    def incFailure: State = updateRatio(Ratio.full).copy(failed = failed + 1)

    def incSuccess: State = updateRatio(Ratio.zero).copy(success = success + 1)

    def incRejected: State = updateRatio(Ratio.zero).copy(rejected = rejected + 1)

    def totalErrorRatio: Ratio = Ratio.apply(failed.toDouble / total).getOrElse(Ratio.zero)

  }

  private def zeroState(scale: Int): State = State(0, 0, 0, DecayingRatio(Ratio.zero, scale))


  //TODO: ChangeMaker with configure
  //make[RejectionError](maxError: Ratio, decayScale:Int, rejected: CircuitTap.State => RejectionError).qualifyErrors[E](qualifie: E => Boolean)
  //.manage(effect)
  //.mamageAndQualify(effect)(qualifie)
  /**
   * Creates a tap that aims for the specified maximum error rate, using
   * the specified function to qualify errors (unqualified errors are
   * not treated as failures for purposes of the tap), and the specified
   * default error used for rejecting tasks submitted to the tap.
   */
  def make[E1, E2](
      maxError: Ratio,
      qualified: E1 => Boolean,
      rejected: => E2,
      decayScale: Int
  ): UIO[CircuitTap[E1, E2]] =
    for {
      state <- Ref.make(zeroState(decayScale))
    } yield new SmartCircuitTap[E1, E2](maxError, qualified, rejected, state)
}
