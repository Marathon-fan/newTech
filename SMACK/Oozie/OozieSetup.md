
## Oozie  

```
Oozie is an orchestration system for Hadoop jobs

The following jobs might need to be chained together to get the final output
At any point you might have 1000s of Hadoop jobs running, many of which would be interdependent on on another  
Managing these manually or with basic scripting does not scale  
Oozie allows orchestration and control of such complex multi-stage Hadoop jobs    
Multi-stage Hadoop jobs(job pipeline) can then be run as a single Oozie job - the Oozie job is the only thing for you to manage!   
1) MapReduce    
2) Hive    
3) DistCp     
4) Pig      
5) Flume      
6) Sqoop
```

the Hadoop Eco-system
```
Oozie
Pig  Hive  Sqoop  DistCp
MapReduce
HDFS
```

Hive may look like SQL, but essentially it's MapReduce job    


**An Oozie Application**   
An Oozie application has one file defined in XML which describes the application   
It references and includes other configuration files, JARs and scripts which perform the action   
The application can be a workflow run manually, a single coordinator or a number of coordinators forming a bundle(data pipeline)    
workflow.xml, coordinator.xml, bundle.xml files describe their corresponding applications   
Oozie expects all files to be in HDFS before it can run    
These XML files along with other files which are required for the Oozie application are copied over to HDFS before the job can run  


Oozie architecture overview
```
Oozie Client ---> Oozie Server <---->  Hadoop
                         ^
                         |
                         |
                      Database   
```

**Oozie Server** 
Manages Oozie job scheduling and execution.   
It runs in a web container such as Apache Tomcat    
It is stateless, and holds job related information in the database    

**Oozie Client**   
User use Oozie client(a command line interface) to interact with Oozie server.    
The server provides a REST API and a Java client so Oozie clients can be written in any language    

**Hadoop**   
The Oozie server is a client of Hadoop   
Oozie applications read their XML from HDFS   
Oozie jobs run on the Hadoop cluster   

**Database**    
The Oozie server is stateless.   
All job related information is stored in the database   
Oozie supports Derby, MySQL, Oracle and PostgreSQL    
The Oozie package comes configured with Derby by default    



## install maven   

Download from https://maven.apache.org/download.cgi and untar 

```sh
sudo mv apache-maven-3.6.0-bin.tar.gz /etc
cd /etc	
sudo tar -zxvf apache-maven-3.6.0-bin.tar.gz
sudo rm apache-maven-3.6.0-bin.tar.gz
sudo nano ~/.bashrc
# then add the following line to ~/.bashrc
export PATH=$PATH:/etc/apache-maven-3.6.0/bin
export OOZIE_HOME=/etc/oozie-5.1.0-built
export PATH=$PATH:$OOZIE_HOME/bin    
# then reload environment vars 
source ~/.bashrc

```

## install Oozie      

```sh
sudo mv oozie-5.1.0.tar.gz /etc
cd /etc	
sudo tar -zxvf oozie-5.1.0.tar.gz
sudo rm oozie-5.1.0.tar.gz
cd oozie-5.1.0/
```

pom.xml
```sh
sudo nano pom.xml
```
```xml
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-javadoc-plugin</artifactId>
                    <version>3.0.1</version>
                    <configuration>
                        <additionalparam>${maven.javadoc.opts}</additionalparam>
                        <javadocExecutable>/usr/lib/jvm/java-8-openjdk-amd64/bin/javadoc</javadocExecutable>
                        <additionalparam>-Xdoclint:none</additionalparam>
                    </configuration>
                </plugin>



        <hadoop.version>2.9.2</hadoop.version>



```

use "ctrl + w" for search in nano   


## build Oozie file    

```sh
cd /etc/oozie-5.1.0/bin
./mkdistro.sh -DskipTests
```

then we can find the file that we need  `/etc/oozie-5.1.0/distro/target/oozie-5.1.0-distro.tar.gz`
```sh
sudo tar -zxvf /etc/oozie-5.1.0/distro/target/oozie-5.1.0-distro.tar.gz    
sudo mv /etc/oozie-5.1.0/distro/target/oozie-5.1.0 /etc/oozie-5.1.0-built  
```

## copy jar files to Oozie  

```sh
sudo mkdir /etc/oozie-5.1.0-built/libext 

# copy ...

# for cloudera   
sudo cp /usr/lib/hadoop/lib/*.jar /etc/oozie-5.1.0-built/libext  


```

## configure Hadoop and Oozie to be able to talk to each other   

core-site.xml
```sh
# for cloudera   
sudo nano /etc/hadoop/conf.cdh5/core-site.xml
```

```xml
<!-- Oozie -->
  <property>
    <name>hadoop.proxyuser.vagrant.hosts</name>
    <value>*</value>
  </property>
  <property>
    <name>hadoop.proxyuser.vagrant.groups</name>
    <value>*</value>
  </property>

```


oozie-site.xml
```sh
sudo nano /etc/oozie-5.1.0-built/conf/oozie-site.xml

```
```xml
 <property>        
      <name>oozie.service.HadoopAccessorService.hadoop.configurations</name> 
      <value>/etc/hadoop/conf.cdh5</value>
    </property>
```

then restart hadoop

## Oozie Prereqs: war, sharelib, metadata db    

```sh
sudo /etc/oozie-5.1.0-built/bin/oozie-setup.sh prepare-war

sudo /etc/oozie-5.1.0-built/bin/oozie-setup.sh sharelib create -fs hdfs://10.10.45.9:8020

cd  /etc/oozie-5.1.0-built/
sudo /etc/oozie-5.1.0-built/bin/ooziedb.sh create -sqlfile oozie.sql -run    


#COPY ALL JARS FROM oozie/libext to oozie/oozie-server/webapps/oozie/WEB-INF/lib/
sudo cp /etc/oozie-5.1.0-built/libext/*.jar  /etc/oozie-5.1.0-built/embedded-oozie-server/webapp/WEB-INF/lib/
```

## start Oozie   

```sh
sudo /etc/oozie-5.1.0-built/bin/oozied.sh start

oozie admin -oozie http://localhost:11000/oozie -status

# run map-reduce example   
sudo tar -zxvf /etc/oozie-5.1.0-built/oozie-examples.tar.gz   

sudo nano /etc/oozie-5.1.0-built/examples/apps/map-reduce/job.properties
# then edit nameNode and jobTracker values
# also add `oozie.system.libpath=true`

hadoop fs -put examples examples
oozie job -oozie http://localhost:11000/oozie -config /Users/swethakolalapudi/oozie-4.2.0/examples/target/oozie-examples-4.2.0-examples/examples/apps/map-reduce/job.properties -run

# CHECKING WORKFLOW STATUS 
oozie job -oozie http://localhost:11000/oozie -info 0000000-160607195411255-oozie-swet-W

```

prepare-war 

proxy


Installing Oozie

Build Oozie(Prereq: Install Maven)
Copy Hadoop Jars to Oozie
Configure Hadoop and Oozie
Oozie Prereqs: war, sharelib, metadata db
Start Oozie and Run a workflow


1 download Maven
2 download Oozie
3 edit Oozie pom file
4 



## Cluster Setup in local machine       

### step1 - on Windows, set up vagrant-proxyconf    

install rubyinstaller
```
https://rubyinstaller.org/downloads/
```

download file vagrant-proxyconf-1.5.2.gem
```
https://rubygems.org/downloads/vagrant-proxyconf-1.5.2.gem
```

install vagrant-proxyconf-1.5.2.gem
```
gem install vagrant-proxyconf-1.5.2.gem
```

add the content to $HOME/.vagrant.d/Vagrantfile (or to a project specific Vagrantfile):
```
Vagrant.configure("2") do |config|
  if Vagrant.has_plugin?("vagrant-proxyconf")
    config.proxy.http     = "http://username:password@http-gw.tcif.telstra.com.au:8080/"
    config.proxy.https    = "http://username:password@http-gw.tcif.telstra.com.au:8080/"
    config.proxy.no_proxy = "localhost,192.168.99.100,artifactory.daas.corp.telstra.com"
  end
  # ... other stuff
end
```
