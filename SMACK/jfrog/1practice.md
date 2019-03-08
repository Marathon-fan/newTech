


# API version 0.1  

According to readme, we setup a jfrog artifactory using EC2, and in there, we set up a maven local repository with the repository key of "libs-release-local"


## publish API version 0.1  

to publish the following project(https://drive.google.com/open?id=1BfTeSsTdwYX1XyC4uB2L59G-XFMAUv8q) as API version 0.1, we use this cmd:  
```sh
gradle artifactoryPublish
```

## test API version 0.1  

to test test API version 0.1, we downlaod the program(https://drive.google.com/open?id=1YN86AhXM7gYYQvhj8105uu8Zf7MN8pSV), and use the cmds:
```sh
sudo rm -rf ~/.gradle/caches/
gradle fatJar --info
java -jar build/libs/myTest-all-1.0-SNAPSHOT.jar 
```

and we see the following results
```
Hello from callPrintTest
BigDataGroup.print.addPrint version 0.1 msg from test ++++++++
BigDataGroup.print.simplePrint version 0.1msg from test
```

# API version 0.2  

## publish API version 0.2  

step1:  
then we delete the old artifactories in the Jfrog repo "libs-release-local",

step2:   

to publish the following project(https://drive.google.com/open?id=1zcOiD2l5fjM_Q79TAMcad6W_Fd824j8C) as API version 0.2, we use this cmd:  
```sh
gradle artifactoryPublish
```

## test API version 0.2  

to test test API version 0.2, we downlaod the program(https://drive.google.com/open?id=1YN86AhXM7gYYQvhj8105uu8Zf7MN8pSV), and use the cmds:
```sh
sudo rm -rf ~/.gradle/caches/
gradle fatJar --info
java -jar build/libs/myTest-all-1.0-SNAPSHOT.jar 
```

and we see the following results
```
Hello from callPrintTest
BigDataGroup.print.addPrint version 0.2 msg from test ++++++++
BigDataGroup.print.simplePrint version 0.2 msg from test
```
