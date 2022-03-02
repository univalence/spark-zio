addSbtPlugin("ch.epfl.scala"             % "sbt-scalafix"   % "0.9.34")
addSbtPlugin("com.github.sbt"            % "sbt-ci-release" % "1.5.10")
addSbtPlugin("io.github.davidgregory084" % "sbt-tpolecat"   % "0.1.22")
addSbtPlugin("org.scalameta"             % "sbt-scalafmt"   % "2.4.6")
addSbtPlugin("org.scoverage"             % "sbt-scoverage"  % "1.9.3")

lazy val codegen =
  project
    .in(file("."))
    .dependsOn(ProjectRef(file("../zio-spark-codegen"), "plugin"))
