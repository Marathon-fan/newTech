# cassandra  



## use docker

```sh
docker pull bitnami/cassandra:3.11.2

# Create a network called  app-tier 
docker network create app-tier --driver bridge

# launch cassandra-server container
docker run -d --name cassandra-server \
    --network app-tier \
    -e CASSANDRA_PASSWORD_SEEDER=yes \
    -e CASSANDRA_PASSWORD=cassandra \
    -v /home/bitnami/cassandra/data  \
    bitnami/cassandra:3.11.2
   # the data will be persisted in /home/bitnami/cassandra/data
   # !!! use "docker logs containerID to see logs when some errors occur like the container exits 

# use cqlsh to login to cassandra-server    
$ docker run -it --rm \
    --network app-tier \
    bitnami/cassandra:3.11.2 cqlsh --username cassandra --password cassandra cassandra-server


```



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



```sh
$ curl -sSL https://raw.githubusercontent.com/bitnami/bitnami-docker-cassandra/master/docker-compose.yml > docker-compose.yml

# then we get the foloowing docker file, modify the version to 3.11.3
// use the following cassandra version 

version: '2'

services:
  cassandra:
    image: 'bitnami/cassandra:3.11.3'
    labels:
      kompose.service.type: nodeport
    ports:
      - '7000:7000'
      - '7001:7001'
      - '9042:9042'
      - '9160:9160'
    volumes:
      - 'cassandra_data:/bitnami'
volumes:
  cassandra_data:         # persist data to this folder
    driver: local

#
sudo apt-get -f install

docker-compose up -d
```





///////////////////////////////old   
## download cassandra

```sh
# Add the Apache repository of Cassandra to /etc/apt/sources.list.d/cassandra.sources.list, for example for the latest 3.11 version:
echo "deb http://www.apache.org/dist/cassandra/debian 311x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

# Add the Apache Cassandra repository keys:
curl https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -

# Update the repositories:
sudo apt-get update

# Then add the public key A278B781FE4B2BDA as follows:
sudo apt-key adv --keyserver pool.sks-keyservers.net --recv-key A278B781FE4B2BDA

# Install Cassandra:
sudo apt-get install cassandra

# install java 8
# then
sudo vi .profile

# add the following lines to .profile
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export JRE_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
# then 
source .profile	


# when installation is in AWS, check whether listen address in cassandra.yaml is set to the private ip of the node (instead of localhost)
cat /etc/cassandra/cassandra.yaml | grep -n localhost 
599:listen_address: localhost
676:rpc_address: localhost

change the addr to ec2 private ip


# edit the file /etc/cassandra/cassandra-env.sh 
change the line  "# JVM_OPTS=\"$JVM_OPTS -Djava.rmi.server.hostname=<public name>\"" to 
"JVM_OPTS=\"$JVM_OPTS -Djava.rmi.server.hostname=127.0.0.1\""

sudo apt install curl
curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
sudo python3 /tmp/get-pip.py
pip install --user pipenv
echo "PATH=$HOME/.local/bin:$PATH" >> ~/.profile
source ~/.profile
sudo pip install cqlsh


sudo service cassandra stop
sudo service cassandra start 
sudo service cassandra status 

nodetool status

curl https://s3.amazonaws.com/downloads.scylladb.com/deb/unstable/scylladb.gpg.pubkey|sudo apt-key add -
cd /etc/apt/sources.list.d/
sudo curl -O https://s3.amazonaws.com/downloads.scylladb.com/deb/unstable/xenial/master/6/scylla.list
sudo apt update
sudo apt install scylla

```


```
docker run --name cassandra -d cassandra:3.0

$ docker run -it --link cassandra:cassandra:3.0 --rm cassandra sh -c 'exec cqlsh "$CASSANDRA_PORT_9042_TCP_ADDR"'

```



common cmd
```sh
sudo service cassandra start 
sudo service cassandra stop
```

```sh
The default location of configuration files is 
/etc/cassandra

The default location of log and data directories is 
/var/log/cassandra/ 
/var/lib/cassandra


Start-up options (heap size, etc) can be configured in 
/etc/default/cassandra.
```
