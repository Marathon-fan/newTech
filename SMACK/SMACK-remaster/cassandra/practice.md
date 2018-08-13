# cassandra  

## to do   
figure "nodetool: Failed to connect to '127.0.0.1:7199' - ConnectException: 'Connection refused (Connection refused)'." problem

in light_sail2, copy the saved files to cassandra



## use docker

```sh
sudo docker pull bitnami/cassandra:3.11.2

# Create a network called  app-tier 
docker network create app-tier --driver bridge

# launch cassandra-server container
# inside docker, the install directory is /bitnami/cassandra
sudo docker run -d --name cassandra-server \
    --network app-tier \
    -e CASSANDRA_PASSWORD_SEEDER=yes \
    -e CASSANDRA_PASSWORD=cassandra \
    -v 'cassandraData:/bitnami:z' \
    bitnami/cassandra:3.11.2
   # the data will be persisted in /home/bitnami/cassandra/data
   # !!! use "docker logs containerID to see logs when some errors occur like the container exits 
   # the data will be synced to the host folder: /var/lib/docker/volumes/cassandraData/_data/
   # for example. use the cmd to see the data: sudo cat /var/lib/docker/volumes/cassandraData/_data/cassandra/data/commitlog/CommitLog-6-1534054262776.log

sudo ls /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/
# edit configure file 1

sudo vi /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra-env.sh
#
JVM_OPTS="$JVM_OPTS -Dcassandra.ignore_dc=true"

sudo vi /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra.yaml
# change the following value
# line 5
cluster_name: 'testCassandra'
# line 599
listen_address: 'cassandra1/2/3 ip'   # enter the machine's name. add the DNS to /etc/hosts file
endpoint_snitch: GossipingPropertyFileSnitch
# line 425
parameters:
          # seeds is actually a comma-delimited list of addresses.
        - seeds: 'cassandra1 ip, cassandra2 ip , cassandra3 ip' 

broadcast_rpc_address: '172.18.0.2'  # ????

sudo cp cassandra1.yaml /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra.yaml
sudo cp cassandra-env.sh /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra-env.sh
sudo cp cassandra-rackdc2.properties  /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra-rackdc.properties

# edit configure file 2
sudo vi /var/lib/docker/volumes/cassandraData/_data/cassandra/conf/cassandra-rackdc.properties
# change the following value
dc=Datacenter1 # for cassandra1 use  Datacenter1; for cassandra2 use  Datacenter2; for cassandra3 use  Datacenter3;
rack=rack1

# restart cassandra
docker restart cassandra-server

docker logs -f cassandra-server

# use cqlsh to login to cassandra-server    
$ docker run -it --rm \
    --network app-tier \
    bitnami/cassandra:3.11.2 cqlsh --username cassandra --password cassandra cassandra-server

# see cluster status
docker exec -it cassandra-server bash
nodetool status  # make sure that ports 7000 and 9042 are open within your security group

# nodetool status !!!

docker volume ls
# then use 
docker inspect volume_name
# Remove a volume:
$ docker volume rm my-vol


```

use the following cmd to create KEYSPACE, TABLE, and insert data
```sql

CREATE KEYSPACE sample
WITH REPLICATION = { 'class':'SimpleStrategy', 'replication_factor': 1};

USE sample;

CREATE TABLE activity(
home_id text,
datetime timestamp,
event text,
code_used text,
PRIMARY KEY (home_id, datetime)
) WITH CLUSTERING ORDER BY (datetime DESC);

insert into activity (home_id, datetime, event, code_used) VALUES ('H01474777', '2018-05-21 07:32:16', 'alarm set1', '5599');
insert into activity (home_id, datetime, event, code_used) VALUES ('H01474778', '2018-05-22 07:32:16', 'alarm set2', '5600');
insert into activity (home_id, datetime, event, code_used) VALUES ('H01474779', '2018-05-22 07:32:19', 'alarm set3', '5601');

select * from activity;

```


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
### defining a keyspace(database)

// in dc1, we will 3 replicas, in dc2, we will have 2 replicas; thus, we must at least have 5 nodes   
// 
```sql
CREATE KEYSPACE vehicle_tracker
WITH REPLICATION = { 'class':'NetworkTopologyStrategy', 'dc1':3, 'dc2':2};


CREATE KEYSPACE sample
WITH REPLICATION = { 'class':'SimpleStrategy', 'replication_factor': 1};

DESCRIBE KEYSPACE vehicle_tracker

USE sample   



```

### delete a keyspace(database)
```sql
DROP KEYSPACE vehicle_tracker;
DESCRIBE KEY SPACE vehicle_tracker
```

### creatting/delete a table   

creatting a table   

```sql
USE sample;

CREATE TABLE activity(
home_id text,
datetime timestamp,
event text,
code_used text,
PRIMARY KEY (home_id, datetime)
) WITH CLUSTERING ORDER BY (datetime DESC);

insert into activity (home_id, datetime, event, code_used) VALUES ('H01474777', '2018-05-21 07:32:16', 'alarm set', '5599');

insert into activity (home_id, datetime, event, code_used) VALUES ('H01474778', '2018-05-22 07:32:16', 'alarm set', '5600');

```

```sql
USE sample;
select * from activity;
```



delete a table
```sql
DROP TABLE activitY
```

entering a keyspace(database)
```sql
USE home_security;
```

defining columns and types
```sql
CREATE TABLE activity(
home_id text,
datetime timestamp,
event text,
code_used text,
....
)

```



CQL data types
```sql
bigint
blob
boolean
coutner
varchar
text
```
note: varchar is the same as text


defining a primary key
```sql
PRIMARY KEY (home_id, datetime)
```

Recoginzing a partiton key  
the partition key is hashed by the partitioner to determine which node in the cluster will store the partition   
```sql
CREATE TABLE activity(
home_id text,
datetime timestamp,
event text,
code_used text,
PRIMARY KEY (home_id, datetime)
) WITH CLUSTERING ORDER BY (datetime DESC);
```

**write data into cassandra table**

there are different ways to write data to a Cassandra table
1 INSERT INTO command   
2 COPY command  
3 sstableloader tool   
```sql
-- select keyspace
-- insert command
USE home_security;
INSERT INTO activity (home_id, datetime, event, code_used) VALUES('H01474777', '2014-04-21 07:32:16', 'alarm set', '5999');

SELECT * FROM activity;

```


```sql
--the COPY command can be used to import data(COPY FROM) from a .csv file to a Cassandra table, or export data(COPY TO) a .csv file

COPY activity (home_id, datetime, event, code_used)
FROM '/path/to/csvfile'
WITH header = true AND delimiter = '|';
```

where clause   
**both home_id and datetime are indexed since the PRIMARY KEY is (home_id, datetime), and all the fields in PRIMARY KEY are indexed**
```sql
SELECT * FROM activity WHERE home_id = 'H01474777' AND datetime > '2014-05-22 00:00:00';

```

if column code_used is not indexed, the following query will not work
```sql
SELECT * FROM activity WHERE code _used = '5599';

```

## secondary index 

CQL supports creating secondary indexes on tables, allowing queries on the table to use those indexes. A secondary index is identified by a name defined by:

**Secondary indexes simple make it so that WHERE clauses that reference values in columns beyond the primary and clustering columns can run.**

```sql
CREATE INDEX code_used_index ON activity (code_used);

--then we can use the following cmd
SELECT * FROM activity WHERE code _used = '5599';

```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
add node to cassandra cluster   

each node in a Cassandra cluster has the same functionality as the others.

To add a new node, it needs:   
1 to have the same cluster name as the existing nodes in the cluster   
2 the IP address(and network access) to at least one of the nodes in the existing cluster    





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
