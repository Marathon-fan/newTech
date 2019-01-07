

ip addresses and hadoop componets   
![ip addrs and hadoop componets](./topoHadoop.jpg)


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
    config.proxy.http     = "http://username:password@xxx.com:8080/"
    config.proxy.https    = "http://username:password@xxx.com:8080/"
    config.proxy.no_proxy = "localhost,192.168.99.100,artifactory.xxx.corp.companyName.com"
  end
  # ... other stuff
end
```



### step1 - set up 3 virtual machine in vagrant environment  

**set up their IPs**

Vagrantfile for master
```sh

vagrantNode = { :host => "masterT", :ip => "10.10.45.9", :box => "bento/ubuntu-18.04", :gui => false}


varDomain = "hadoopVagrantTest"

puts "#{vagrantNode[:host]}.#{varDomain}"
puts "#{vagrantNode[:box]}"

Vagrant.configure("2") do |config|

  config.vm.box = vagrantNode[:box]
  config.vm.network "private_network", ip: vagrantNode[:ip], :netmask => "255.255.255.0"
  config.vm.hostname = "#{vagrantNode[:host]}.#{varDomain}"

  #
  config.vm.provider "virtualbox" do |vb|
     vb.name = vagrantNode[:host].to_s
     vb.gui = vagrantNode[:gui]
     vb.memory = "4096"
     vb.cpus = 2
   end
  #

   config.vm.provision "shell", inline: <<-SHELL
     # Install JDK8
     apt update
     apt install -y openjdk-8-jdk
     apt install -y gradle
     # Make gradle to use XXX Artifactor
     mkdir -p /home/vagrant/.gradle
     cat > /home/vagrant/.gradle/gradle.properties << EOF
org.gradle.daemon=true
artifactory_contextUrl=https://artifactory.xxx.corp.companyName.com/artifactory
artifactory_pluginsUrl=https://artifactory.xxx.corp.companyName.com/artifactory/plugins-release
artifactory_user=dummy
artifactory_password=dummy
EOF
   SHELL
end
```

Vagrantfile for slave1
```sh

vagrantNode = { :host => "slave1T", :ip => "10.10.45.10", :box => "bento/ubuntu-18.04", :gui => false}

varDomain = "hadoopVagrantTest"

puts "#{vagrantNode[:host]}.#{varDomain}"
puts "#{vagrantNode[:box]}"

Vagrant.configure("2") do |config|

  config.vm.box = vagrantNode[:box]
  config.vm.network "private_network", ip: vagrantNode[:ip], :netmask => "255.255.255.0"
  config.vm.hostname = "#{vagrantNode[:host]}.#{varDomain}"

  #
  config.vm.provider "virtualbox" do |vb|
     vb.name = vagrantNode[:host].to_s
     vb.gui = vagrantNode[:gui]
     vb.memory = "6144"
     vb.cpus = 2
   end
  #

   config.vm.provision "shell", inline: <<-SHELL
     # Install JDK8
     apt update
     apt install -y openjdk-8-jdk
     apt install -y gradle
     # Make gradle to use XXX Artifactor
     mkdir -p /home/vagrant/.gradle
     cat > /home/vagrant/.gradle/gradle.properties << EOF
org.gradle.daemon=true
artifactory_contextUrl=https://artifactory.xxx.corp.companyName.com/artifactory
artifactory_pluginsUrl=https://artifactory.xxx.corp.companyName.com/artifactory/plugins-release
artifactory_user=dummy
artifactory_password=dummy
EOF
   SHELL
end

```

Vagrantfile for slave2
```sh

vagrantNode = { :host => "slave2T", :ip => "10.10.45.11", :box => "bento/ubuntu-18.04", :gui => false}

varDomain = "hadoopVagrantTest"

puts "#{vagrantNode[:host]}.#{varDomain}"
puts "#{vagrantNode[:box]}"

Vagrant.configure("2") do |config|

  config.vm.box = vagrantNode[:box]
  config.vm.network "private_network", ip: vagrantNode[:ip], :netmask => "255.255.255.0"
  config.vm.hostname = "#{vagrantNode[:host]}.#{varDomain}"

  #
  config.vm.provider "virtualbox" do |vb|
     vb.name = vagrantNode[:host].to_s
     vb.gui = vagrantNode[:gui]
     vb.memory = "6144"
     vb.cpus = 2
   end
  #

   config.vm.provision "shell", inline: <<-SHELL
     # Install JDK8
     apt update
     apt install -y openjdk-8-jdk
     apt install -y gradle
     # Make gradle to use XXX Artifactor
     mkdir -p /home/vagrant/.gradle
     cat > /home/vagrant/.gradle/gradle.properties << EOF
org.gradle.daemon=true
artifactory_contextUrl=https://artifactory.xxx.corp.companyName.com/artifactory
artifactory_pluginsUrl=https://artifactory.xxx.corp.companyName.com/artifactory/plugins-release
artifactory_user=dummy
artifactory_password=dummy
EOF
   SHELL
end
```

Finally, we use `vagrant up` to start these 3 VMs

## generate a ssh key pair and deploy the same key pair to all 3 VMs   

so that from master, we can scp configure files to slave1 and slave2 to save time

for master
```sh
# step 1
ssh-keygen -t rsa    
# Press enter for each line   

# step2
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys   

# step 3
chmod og-wx ~/.ssh/authorized_keys 
# g   group   members of the file's group
# o   others  users who are neither the file's owner nor members of the file's group
# -wx write and execute   
```

copy the following files from master to slave1 and slave2 in current user's .ssh folder
```
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

for both slave 1 and slave 2
```sh
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys   
chmod og-wx ~/.ssh/authorized_keys 
```

## Edit /etc/hosts files for all 3 VMs

```sh
sudo nano /etc/hosts
```
add the following lines:
```
10.10.45.9      masterT
10.10.45.9      10.10.45.9
10.10.45.9      masterT.hadoopVagrantTest
10.10.45.10     slave1T
10.10.45.10     10.10.45.10
10.10.45.10     slave1T.hadoopVagrantTest
10.10.45.11     slave2T 
10.10.45.11     10.10.45.11
10.10.45.11     slave2T.hadoopVagrantTest
```

delete the 127.0.1.1(or 127.0.0.1) entry that points to your host name
```
127.0.0.1       localhost
127.0.1.1       masterT.hadoopVagrantTest     masterT
```

### step2   

**For each VM, configure openjdk-8**

```sh
sudo nano /etc/environment
```
add the following line:
```
JAVA_HOME = /usr/lib/jvm/java-8-openjdk-amd64/jre
```

## install Hadoop  


**For each VM, set up cloudera and install service**

**On all nodes(master, slave1, slave2)**

```sh
sudo vi /etc/apt/sources.list.d/cloudera.list
```
then add the following content to cloudera.list
```
deb [arch=amd64] http://archive.cloudera.com/cdh5/debian/jessie/amd64/cdh jessie-cdh5 contrib
deb-src http://archive.cloudera.com/cdh5/debian/jessie/amd64/cdh jessie-cdh5 contrib
```

```sh
sudo vi /etc/apt/preferences.d/cloudera.pref
```
then add the following content to cloudera.pref
```
Package: *
Pin: release o=Cloudera, l=Cloudera
Pin-Priority: 501
```

add archive.key
```sh
wget https://archive.cloudera.com/cdh5/debian/jessie/amd64/cdh/archive.key -O archive.key 
sudo apt-key add archive.key
```

**On Master**
```sh
sudo apt-get update
sudo apt-get install hadoop-yarn-resourcemanager
sudo apt-get install hadoop-hdfs-namenode
sudo apt-get install hadoop-mapreduce-historyserver hadoop-yarn-proxyserver
sudo apt-get install hadoop-client
```


**On Slave 1**
```sh
sudo apt-get update
sudo apt-get install hadoop-hdfs-secondarynamenode
sudo apt-get install hadoop-yarn-nodemanager hadoop-hdfs-datanode hadoop-mapreduce
sudo apt-get install hadoop-client
```

**On Slave 2**
```sh
sudo apt-get update
sudo apt-get install hadoop-yarn-nodemanager hadoop-hdfs-datanode hadoop-mapreduce
sudo apt-get install hadoop-client
```

**On all nodes(master, slave1, slave2)**


--Set install Java 8 and set JAVA_version (on all nodes)

```sh
sudo nano /etc/apt/sources.list
```
add the following conent to the file:
```
deb http://ftp.debian.org/debian jessie-backports main
```
install  java 8 and set java version
```sh
sudo apt-get -y  update && sudo apt-get install -y -t jessie-backports ca-certificates-java && sudo apt-get -y install openjdk-8-jdk && sudo update-alternatives --config java
# at the end of the process, select 2 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

configure bigtop-detect-javahome file
```sh
sudo nano /usr/lib/bigtop-utils/bigtop-detect-javahome
```
```
# Add export JAVA_HOME before the if statement - for loop(before the line "# attempt to find java")

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
```

## unzip hadoop   

```
sudo mv hadoop-2.9.2.tar.gz /etc
cd /etc
sudo tar -zxvf hadoop-2.9.2.tar.gz
sudo rm hadoop-2.9.2.tar.gz
sudo mv hadoop-2.9.2 hadoop
```

## add user hdfs , yarn    

```sh
sudo adduser hdfs
# the passwd also use hdfs
sudo adduser yarn
# the passwd also use yarn
sudo adduser mapred
# the passwd also use mapred
sudo usermod -aG sudo hdfs
sudo usermod -aG sudo yarn
sudo usermod -aG sudo mapred
sudo usermod -aG sudo vagrant

# create group hadoop and add vagrant to this group
sudo groupadd hadoop
sudo usermod -a -G hadoop vagrant

```

## add environment vars    

```sh
sudo nano ~/.bashrc
```
add the following line
```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre

export HADOOP_HOME=/etc/hadoop
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export PATH=$PATH:/etc/hadoop/bin/

```

```sh
source ~/.bashrc
```

**On Master**
```sh
sudo nano /etc/hadoop/etc/hadoop/hadoop-env.sh

# add the line to the file
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
```

```sh
sudo cp -r /etc/hadoop/conf.empty /etc/hadoop/conf.cdh5
sudo update-alternatives --install /etc/hadoop/conf hadoop-conf /etc/hadoop/conf.cdh5 50  
sudo update-alternatives --set hadoop-conf /etc/hadoop/conf.cdh5
```


core-site.xml
```sh
sudo nano /etc/hadoop/etc/hadoop/core-site.xml
```
```xml
    <property>
     <name>fs.defaultFS</name>
     <value>hdfs://10.10.45.9:8020</value>
    </property>
    <property>
      <name>io.compression.codecs</name>
      <value>org.apache.hadoop.io.compress.DefaultCodec,org.apache.hadoop.io.compress.GzipCodec,org.apache.hadoop.io.compress.BZip2Codec,org.apache.hadoop.io.compress.SnappyCodec</value>
    </property>
    <property>
     <name>hadoop.proxyuser.mapred.groups</name>
     <value>*</value>
    </property>
        <property>
     <name>hadoop.proxyuser.mapred.hosts</name>
     <value>*</value>
    </property>
```

hdfs-site.xml
```sh
sudo nano /etc/hadoop/etc/hadoop/hdfs-site.xml
```
```xml
    <property>
     <name>dfs.permissions.superusergroup</name>
     <value>hadoop</value>
    </property> 
    <property>
     <name>dfs.namenode.name.dir</name>
     <value>file:///data/1/dfs/nn</value>
    </property> 
    <property>
     <name>dfs.datanode.data.dir</name>
     <value>file:///data/1/dfs/dn</value>
    </property> 
    <property>
      <name>dfs.namenode.http-address</name>
      <value>10.10.45.9:50070</value>
      <description>
        The address and the base port on which the dfs NameNode Web UI will listen.
      </description>
    </property>
    <property>
      <name>dfs.webhdfs.enabled</name>
      <value>true</value>
    </property>
    <property>
      <name>dfs.namenode.datanode.registration.ip-hostname-check</name>
      <value>false</value>
    </property>
```


mapred-site.xml
```sh
sudo mv mapred-site.xml.template mapred-site.xml
sudo nano /etc/hadoop/etc/hadoop/mapred-site.xml
```
```xml
    <property>
     <name>mapreduce.framework.name</name>
     <value>yarn</value>
    </property>
    <property>
     <name>mapreduce.jobhistory.address</name>
     <value>10.10.45.9:10020</value>
    </property>
    <property>
     <name>mapreduce.jobhistory.webapp.address</name>
     <value>10.10.45.9:19888</value>
    </property> 
    <property>
        <name>yarn.app.mapreduce.am.staging-dir</name>
        <value>/user</value>
    </property> 
    <property> 
    <name>mapreduce.application.classpath</name>
    <value>$HADOOP_HOME/share/hadoop/mapreduce/*,$HADOOP_HOME/share/hadoop/mapreduce/lib/*,$HADOOP_HOME/share/hadoop/common/*,$HADOOP_HOME/share/hadoop/common/lib/*,$HADOOP_HOME/share/hadoop/yarn/*,$HADOOP_HOME/share/hadoop/yarn/lib/*,$HADOOP_HOME/share/hadoop/hdfs/*,$HADOOP_HOME/share/hadoop/hdfs/lib/*</value>
    </property>
```


yarn-site.xml
```sh
sudo nano /etc/hadoop/etc/hadoop/yarn-site.xml
```
```xml
  <property>
    <name>yarn.resourcemanager.hostname</name>
    <value>10.10.45.9</value>
  </property>   
  <property>
    <name>yarn.resourcemanager.resource-tracker.address</name>
    <value>10.10.45.9:8031</value>
  </property>
  <property>
    <name>yarn.resourcemanager.address</name>
    <value>10.10.45.9:8032</value>
  </property>
  <property>
    <name>yarn.resourcemanager.scheduler.address</name>
    <value>10.10.45.9:8030</value>
  </property>
  <property>
    <name>yarn.resourcemanager.admin.address</name>
    <value>10.10.45.9:8033</value>
  </property>
  <property>
    <name>yarn.resourcemanager.webapp.address</name>
    <value>10.10.45.9:8088</value>
  </property>  
  <property>
    <description>Classpath for typical applications.</description>
    <name>yarn.application.classpath</name>
    <value>
        $HADOOP_CONF_DIR,
        $HADOOP_COMMON_HOME/*,$HADOOP_COMMON_HOME/lib/*,
        $HADOOP_HDFS_HOME/*,$HADOOP_HDFS_HOME/lib/*,
        $HADOOP_MAPRED_HOME/*,$HADOOP_MAPRED_HOME/lib/*,
        $HADOOP_YARN_HOME/*,$HADOOP_YARN_HOME/lib/*
    </value>
  </property>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
    <property>
    <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
  <property>
    <name>yarn.nodemanager.local-dirs</name>
    <value>file:///data/1/yarn/local</value>
  </property>
  <property>
    <name>yarn.nodemanager.log-dirs</name>
    <value>file:///data/1/yarn/logs</value>
  </property>
  <property>
    <name>yarn.log.aggregation.enable</name>

    <value>true</value> 
  </property>
  <property>
    <description>Where to aggregate logs</description>
    <name>yarn.nodemanager.remote-app-log-dir</name>
    <value>hdfs://10.10.45.9:8020/var/log/hadoop-yarn/apps</value>
  </property>
  <property>
    <name>yarn.nodemanager.resource.memory-mb</name>
    <value>3072</value>
</property>
<property>
   <name>yarn.scheduler.minimum-allocation-mb</name>
   <value>2048</value>
</property>
<property>
    <name>yarn.nodemanager.vmem-pmem-ratio</name>
    <value>2.1</value>
</property>
<property>
  <name>yarn.web-proxy.address</name>
  <value>10.10.45.9:9046</value>
</property>

```


masters (this file contains the addr of secondary name node)
```sh
sudo nano /etc/hadoop/etc/hadoop/masters
```
```
10.10.45.10
```


**On both Slave1 and Slave2**

```sh
sudo chmod 777 -R /etc/hadoop/etc/hadoop

```

**On master**
```sh
scp -r /etc/hadoop/etc/hadoop/* 10.10.45.10:/etc/hadoop/etc/hadoop
scp -r /etc/hadoop/etc/hadoop/* 10.10.45.11:/etc/hadoop/etc/hadoop
```


On Slave1 and Slave2 (after copying, revoke write right)
```sh
sudo chmod 755 -R /etc/hadoop
```


**ON master,  slave1 and slave2**
```sh
sudo update-alternatives --install /etc/hadoop/conf hadoop-conf /etc/hadoop/conf.cdh5 50  
sudo update-alternatives --set hadoop-conf /etc/hadoop/conf.cdh5
```

**On Master**
create name node directory and other directories
```sh

sudo mkdir -p /data/1/dfs/nn
sudo chown -R hdfs:hdfs /data/1/dfs/nn
sudo chmod 777 /data/1/dfs/nn

sudo mkdir -p /data/1/yarn/logs
sudo chown -R hdfs:hdfs /data/1/yarn/logs
sudo chmod 777 /data/1/yarn/logs

sudo mkdir -p /data/1/yarn/local
sudo chown -R hdfs:hdfs /data/1/yarn/local
sudo chmod 777 /data/1/yarn/local

sudo mkdir -p /etc/hadoop/logs
sudo chown -R hdfs:hdfs /etc/hadoop/logs
sudo chmod 777 /etc/hadoop/logs
```


**On Slave1 and Slave2**   
create data node directory 
```sh
sudo mkdir -p /data/1/dfs/dn
sudo chown -R vagrant:hadoop /data/1/dfs/dn
sudo chmod 777 /data/1/dfs/dn

sudo mkdir -p /etc/hadoop/logs/
sudo chown -R vagrant:hadoop /etc/hadoop/logs/
sudo chmod 777 /etc/hadoop/logs/

sudo mkdir -p /data/1/yarn/local
sudo chown -R vagrant:hadoop /data/1/yarn/local
sudo chmod 777 /data/1/yarn/local

sudo mkdir -p /data/1/yarn/logs
sudo chown -R vagrant:hadoop /data/1/yarn/logs
sudo chmod 777 /data/1/yarn/logs


```

**On Master**
format hdfs
```sh
sudo -u hdfs /etc/hadoop/bin/hdfs namenode -format
```

/etc/hadoop/etc/

## Start HDFS

**On Slave1**
```sh
/etc/hadoop/sbin/hadoop-daemon.sh start secondarynamenode
/etc/hadoop/sbin/yarn-daemon.sh start nodemanager
/etc/hadoop/sbin/hadoop-daemon.sh start datanode
jps
```


**On Slave2**
```sh
/etc/hadoop/sbin/yarn-daemon.sh start nodemanager
/etc/hadoop/sbin/hadoop-daemon.sh start datanode
jps
```


**On Master**
```sh
/etc/hadoop/sbin/start-yarn.sh
/etc/hadoop/sbin/yarn-daemon.sh stop resourcemanager
/etc/hadoop/sbin/yarn-daemon.sh start resourcemanager
sudo /etc/hadoop/sbin/hadoop-daemon.sh start namenode
/etc/hadoop/sbin/mr-jobhistory-daemon.sh start historyserver
/etc/hadoop/sbin/yarn-daemon.sh start proxyserver
jps
```


then navigate to the following addr:
```sh
http://10.10.45.9:50070


# laster
# application 
http://10.10.45.9:8088

# history server
http://10.10.45.9:19888
```

/etc/hadoop/

**On master(also can be created on any data node)**

Create /tmp dir -- on hdfs
```sh
sudo -u hdfs hadoop fs -mkdir /tmp
sudo -u hdfs hadoop fs -chmod -R 1777 /tmp
```


Create user directory --Only for the first time
```sh
sudo -u hdfs hadoop fs -mkdir /user
sudo -u hdfs hadoop fs -mkdir /user/vagrant                 
sudo -u hdfs hadoop fs -chown vagrant:vagrant /user/vagrant
```

For Job History -- On HDFS
```sh
sudo -u hdfs hadoop fs -mkdir -p /user/history
sudo -u hdfs hadoop fs -chmod -R 1777 /user/history
sudo -u hdfs hadoop fs -chown mapred:hadoop /user/history
```

For YARN logs -- On HDFS
```sh
sudo -u hdfs hadoop fs -mkdir -p /var/log/hadoop-yarn
sudo -u hdfs hadoop fs -mkdir -p /var/log/hadoop-yarn/apps

sudo -u hdfs hadoop fs -chown yarn:mapred /var/log/hadoop-yarn  
sudo -u hdfs hadoop fs -chown yarn:mapred /var/log/hadoop-yarn/apps  

```


**on all three nodes(master, slave1, slave2)**

Create and permission local dirs ### ON ALL NODES  ###
```sh
sudo mkdir -p /data/1/yarn/local
sudo mkdir -p /data/1/yarn/logs
sudo mkdir -p /var/log/hadoop-yarn/apps
sudo chown -R yarn:yarn /data/1/yarn/local
sudo chown -R yarn:yarn /data/1/yarn/logs
sudo chown -R yarn:yarn /var/log/hadoop-yarn/apps

```


navigate to 
```
# name node 
http://10.10.45.9:50070

# application 
http://10.10.45.9:8088

# history server
http://10.10.45.9:19888
```



**on slave1**
```sh

sudo -u vagrant hadoop fs -mkdir -p input
sudo -u vagrant hadoop fs -ls /user/vagrant
# then we see the directory /user/hdfs/input

wget http://salsahpc.indiana.edu/tutorial/source_code/Hadoop-WordCount.zip
unzip Hadoop-WordCount.zip
sudo -u vagrant hadoop fs -put  Hadoop-WordCount/input/ /user/vagrant/input/
sudo -u vagrant hadoop fs -ls /user/vagrant/input/input
sudo -u vagrant hadoop fs -cat /user/vagrant/input/input/Word_Count_input.txt

sudo -u vagrant hadoop fs -rm -r output/mapreduce/WordCount

sudo -u vagrant hadoop jar Hadoop-WordCount/wordcount.jar WordCount /user/vagrant/input/input output/mapreduce/WordCount

sudo -u vagrant hadoop fs -ls output/mapreduce/WordCount
sudo -u vagrant hadoop fs -cat output/mapreduce/WordCount/part-r-00000
```


## debug(when cannot start namenode)

```
java.io.IOException: Incompatible clusterIDs in /data/1/dfs/dn: namenode clusterID = CID-de0c0a97-a3f1-4247-9d0e-9ce3146150d3; datanode clusterID = CID-3b3b4a71-d013-4ad9-a80d-46829e976fde
```

```sh
# on master
sudo rm -r /data/1/dfs/nn/*
sudo chown -R hdfs:hdfs /data/1/dfs/nn/current/
sudo chown -R hdfs:hdfs /data/1/dfs/nn/current/VERSION
sudo chown -R hdfs:hdfs /data/1/dfs/nn/*
sudo chown -R hdfs:hdfs /data/1/dfs
sudo chmod 777 /data/1/dfs/nn/
sudo chmod 777 /data/1/dfs/nn/current/
sudo chmod 777 /data/1/dfs/nn/current/VERSION
sudo chmod 777  /data/1/dfs

sudo chown hdfs:hdfs -R /data/1/dfs/nn/current/

# on slaves
sudo rm -r /data/1/dfs/dn/*

```

```sh

# on master
sudo rm -r /data/1/dfs/nn/*

# on slaves
sudo rm -r /data/1/dfs/dn/*

# on master
sudo -u hdfs /etc/hadoop/bin/hdfs namenode -format

hdfs dfsadmin -report

```


see logs
```
/etc/hadoop/logs
```

