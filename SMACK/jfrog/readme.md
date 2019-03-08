
# jfrog   

## Nexus vs JFrog

## install  

### System Requirements    

JDK 8
```sh

# JDK
# You must run Artifactory with JDK 8, preferably JDK 8 update 45 and above.
sudo yum install java-1.8.0

java -XshowSettings:properties -version 2>&1 > /dev/null | grep 'java.home'
# then add java home to ~/.bash_profile 
sudo vi ~/.bash_profile 
# JAVA_HOME
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.191.b12-0.amzn2.x86_64/jre

source ~/.bash_profile 

```

```
JVM Memory Allocation
While not a strict requirement, we recommend that you modify the JVM memory parameters used to run Artifactory.

You should reserve at least 512MB for Artifactory, and the recommended values for JVM parameters are as follows:

Artifactory default JVM parameters

The JVM default values are:

-server -Xms512m -Xmx2g -Xss256k -XX:+UseG1GC

For a manual installation, modify JAVA_OPTIONS in $ARTIFACTORY_HOME/bin/artifactory.default.
```

### AWS HTTP access to EC2 instance  
```
in the EC2 instance page, click its "security groups", add the following to Inbound(so that your ip can use http to communicate with the EC2 instance):

type: All TCP
Protocal: TCP
Port Range: 0-65535 
Source: your PC's addr
```


### Installing Artifactory    

To install Artifactory manually, simply unzip the Artifactory download file to a location on your file system. This will be your $ARTIFACTORY_HOME location.
```sh
sudo unzip jfrog-artifactory-oss-6.8.4.zip   

sudo vi ~/.bash_profile 
# then add the following line to .bash_profile 
# jforg
ARTIFACTORY_HOME=/opt/artifactory-oss-6.8.4

source ~/.bash_profile 

```

No further action is needed.

### Running Artifactory

You can run Artifactory manually to see its behavior by directly executing:
```sh
sudo $ARTIFACTORY_HOME/bin/artifactory.sh 
```

The console is locked on the Artifactory process and you can stop it cleanly with Ctrl+C.

To directly run Artifactory as a daemon process, using the environment variables of the shell you are currently in, execute the following script:
```sh
$ARTIFACTORY_HOME/bin/artifactoryctl start
```
To verify Artifactory is running, you can access it in your browser at:

http://SERVER_DOMAIN:8081/artifactory

For example, if you are testing on your ec2 you would use:  http://EC2PublicIP:8081/artifactory
default userName and password
```
Username: admin
Password: password
```


///////////////////

Nexus    
JFrog

admin:admin

repository type
repository -key    :  my-local-demo

//--
libs-release
libs-release
libs-release
libs-snapshot

setting.xml

change username and passwd 

```
mvn package
mvn clean deploy       # gen the project jar package
```

