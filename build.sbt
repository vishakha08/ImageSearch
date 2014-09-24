name := "Image-Upload-Search"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  "japid42" % "japid42_2.10" % "0.9.16",
  "net.sourceforge.jtds" % "jtds" % "1.3.1"
)     

play.Project.playJavaSettings

resolvers += Resolver.url("My GitHub Play Repository", url("http://branaway.github.io/releases/"))(Resolver.ivyStylePatterns)
         
unmanagedResourceDirectories in Compile  <+= baseDirectory( _ / "japidroot" )