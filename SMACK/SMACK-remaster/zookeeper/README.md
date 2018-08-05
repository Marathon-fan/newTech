# zookeeper  

## Quorum Setup   




3 zookeepers - for small application
```
pros:
distributed 

preferred for small Kafka deployments

cons: 
only one server can go down

```

zookeeper1, zookeeper2, zookeeper3

////////// set up zookeeper in my machine  

## start from a raw machine    

install tools and preconfiguration  
```sh
# packages
sudo apt-get update && \
sudo  apt-get -y install wget ca-certificates zip net-tools vim nano tar netcat
#on aws AMI, use   sudo  yum install wget ca-certificates zip net-tools vim nano tar netcat

# java Open JDK 8
sudo apt-get -y install default-jdk   # sudo yum install java-1.8.0-openjdk
java -version

# disable RAM Swap - can set to 0 on certain Linux distro
sudo sysctl vm.swappiness
sudo sysctl vm.swappiness=1
sudo sysctl vm.swappiness

echo 'vm.swappiness=1' | sudo tee --append /etc/sysctl.conf
cat /etc/sysctl.conf

cat /etc/hosts

# mock DNS
echo "kafka1IPAddr(usePrivateIP) kafka1
zookeeper1IPAddr(usePrivateIP)   zookeeper1
kafka2IPAddr(usePrivateIP)  kafka2
zookeeper2IPAddr(usePrivateIP)  zookeeper2
kafka3IPAddr(usePrivateIP)  kafka3
zookeeper3IPAddr(usePrivateIP)  zookeeper3" | sudo tee append /etc/hosts

cat /etc/hosts       
```




```sh
wget http://apache.mirror.digitalpacific.com.au/kafka/0.10.2.1/kafka_2.12-0.10.2.1.tgz
tar -xvzf kafka_2.12-0.10.2.1.tgz
rm kafka_2.12-0.10.2.1.tgz
mv kafka_2.12-0.10.2.1 kafka      # rename the folder
cd kafka/
# 
cat config/zookeeper.properties   
ls config/
ls bin/
bin/zookeeper-server-start.sh config/zookeeper.properties
ctrl + c        # stop zookeeper

bin/zookeeper-server-start.sh -daemon config/zookeeper.properties          # launch zookeeper as a daemon(in the background)  
bin/zookeeper-shell.sh localhost:2181                                      # use zookeeper shell to see zookeeper's status
ls /                                                                       # if we see [zookeeper], then it means zookeeper works well
ctrl + c        # exit zookeeper shell
echo "ruok" | nc localhost 2181 ; echo                                     # zookeeper will respond imok

```

install zookeeper boot scripts, make it a linux service
```sh
sudo nano /etc/init.d/zookeeper       # here we input the sh of zookeeper which is the next sh script(sh of zookeeper as a linux service)

sudo chmod +x /etc/init.d/zookeeper   # make it executable    
sudo chown root:root /etc/init.d/zookeeper  # make the root own this file  

# you can safely ignore the warning
sudo update-rc.d zookeeper defaults    # update the service  

# stop zookeeper
sudo service zookeeper stop
# verify zookeeper's stopped
nc -vz localhost 2181
sudo service zookeeper status

sudo service zookeeper start
nc -vz localhost 2181     # connection to localhost 2181 prot [tcp/*] succeeded!
sudo service zookeeper status
cat logs/zookeeper.out    # check zookeeper logs 
```

script(sh of zookeeper as a linux service)
```sh
#!/bin/bash
#/etc/init.d/zookeeper
DAEMON_PATH=/home/bitnami/kafka/bin
DAEMON_NAME=zookeeper
# Check that networking is up.
#[ ${NETWORKING} = "no" ] && exit 0

PATH=$PATH:$DAEMON_PATH

# See how we were called.
case "$1" in
  start)
        # Start daemon.
        pid=`ps ax | grep -i 'org.apache.zookeeper' | grep -v grep | awk '{print $1}'`
        if [ -n "$pid" ]
          then
            echo "Zookeeper is already running";
        else
          echo "Starting $DAEMON_NAME";
          $DAEMON_PATH/zookeeper-server-start.sh -daemon /home/bitnami/kafka/config/zookeeper.properties
        fi
        ;;
  stop)
        echo "Shutting down $DAEMON_NAME";
        $DAEMON_PATH/zookeeper-server-stop.sh
        ;;
  restart)
        $0 stop
        sleep 2
        $0 start
        ;;
  status)
        pid=`ps ax | grep -i 'org.apache.zookeeper' | grep -v grep | awk '{print $1}'`
        if [ -n "$pid" ]
          then
          echo "Zookeeper is Running as PID: $pid"
        else
          echo "Zookeeper is not Running"
        fi
        ;;
  *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
esac

exit 0

```



////////// set up zookeeper on the other two machine   
do the same thing on the other two vms(but in different availability zones of aws)

```sh
# start zookeeper on every vm
sudo service zookeeper start
sudo service zookeeper status

# check the connection status on every vm
nc -vz zookeeper1 2181
nc -vz zookeeper2 2181
nc -vz zookeeper3 2181

# set up zookeepr quorum


```


script(sh of setting up zookeeper quorum)
```sh
#!/bin/bash
# create data dictionary for zookeeper
sudo mkdir -p /data/zookeeper
sudo chown -R bitnami:bitnami /data/
# declare the server's identity
echo "1" > /data/zookeeper/myid    # the first vm
cat /data/zookeeper/myid

echo "2" > /data/zookeeper/myid    # the second vm
cat /data/zookeeper/myid

echo "3" > /data/zookeeper/myid    # the third vm
cat /data/zookeeper/myid

# edit the zookeeper settings for each zookeeper
rm /home/bitnami/kafka/config/zookeeper.properties
nano /home/bitnami/kafka/config/zookeeper.properties     # enter content(zookeeper new properties) 

# restart the zookeeper service for each zookeeper       # 
sudo service zookeeper stop
sudo service zookeeper start                             # or we can use the following cmd on each vm to see the leader election process 
                                                         # bin/zookeeper-server-start.sh config/zookeeper.properties 

# ckeck if every zookeeper is OK                                                         
echo "ruok" | nc zookeeper1 2181 ; echo
echo "ruok" | nc zookeeper2 2181 ; echo
echo "ruok" | nc zookeeper3 2181 ; echo

echo "stat" | nc zookeeper1 2181 ; echo
echo "stat" | nc zookeeper2 2181 ; echo
echo "stat" | nc zookeeper3 2181 ; echo                                                  

# then the three zookeeper share the same data

# on zookeeper1 vm
bin/zookeeper-shell.sh zookeeper1:2181
ls /

# on zookeeper2 vm
bin/zookeeper-shell.sh zookeeper2:2181
ls /

# on zookeeper3 vm
bin/zookeeper-shell.sh zookeeper3:2181
ls /

# in zookeeper1
create /my-node "some data"
ls /

# in zookeeper2 and zookeeper3    # the three zookeepers are in distributed mode and sync data from each other
ls /      # and we see the same data as in zookeeper1
get /my-node

# in zookeeper2
rmr /my-node 
ls /  # /my-node was gone from zookeeper2, can also was gone from zookeeper1 and zookeeper3

# use the following cmd to see the log
cat logs/zookeeper.out
cat logs/zookeeper.out | head -100


# observe the logs - need to do this on every machine
cat /home/ubuntu/kafka/logs/zookeeper.out | head -100
nc -vz localhost 2181
nc -vz localhost 2888
nc -vz localhost 3888
echo "ruok" | nc localhost 2181 ; echo
echo "stat" | nc localhost 2181 ; echo
bin/zookeeper-shell.sh localhost:2181
# not happy
ls /


```

content(zookeeper new properties) 
```sh
# the location to store the in-memory database snapshots and, unless specified otherwise, the transaction log of updates to the database.
dataDir=/data/zookeeper
# the port at which the clients will connect
clientPort=2181
# disable the per-ip limit on the number of connections since this is a non-production config
maxClientCnxns=0
# the basic time unit in milliseconds used by ZooKeeper. It is used to do heartbeats and the minimum session timeout will be twice the tickTime.
tickTime=2000
# The number of ticks that the initial synchronization phase can take
initLimit=10
# The number of ticks that can pass between
# sending a request and getting an acknowledgement
syncLimit=5
# zoo servers
# these hostnames such as `zookeeper-1` come from the /etc/hosts file
server.1=zookeeper1:2888:3888
server.2=zookeeper2:2888:3888
server.3=zookeeper3:2888:3888

```

for the quorum consisting of 3 zookeepers, only one can be down. If two are down, the quorum is down.


////////////////////////////////////////////////////////////////////////////////////////////////
## setup zoonavigator

choose a machine to install zoonavigator(it can be a new machine, or a machine with little cup usage)
```
sudo apt install docker
sudo apt install docker-compose
sudo nano zoonavigator-docker-compose.yml    # input the yml file and save
sudo docker-compose -f zoonavigator-docker-compose.yml up -d    #
sudo docker ps
curl localhost:8001


then enable network URLs to get access to this node, and we can use its ip:8001 to get access to zoonavigator 
add "zookeeper1:2181,zookeeper2:2181,zookeeper3:2181" as the connection string

```


yml file
```sh
version: '2'

services:
  # https://github.com/elkozmon/zoonavigator
  web:
    image: elkozmon/zoonavigator-web:latest
    container_name: zoonavigator-web
    network_mode: host
    environment:
      API_HOST: "localhost"
      API_PORT: 9001
      SERVER_HTTP_PORT: 8001
    depends_on:
     - api
    restart: always
  api:
    image: elkozmon/zoonavigator-api:latest
    container_name: zoonavigator-api
    network_mode: host
    environment:
      SERVER_HTTP_PORT: 9001
    restart: always

```



////////////////////////////////////////////////////////////////////////////////////////////////
## using zookeeper Command Line Interface

```
1 create nodes, sub nodes, etc...
2 get/set data for a node
3 watch a node
4 delete a node

```

```sh
sudo service zookeeper start

bin/zookeeper-shell.sh  localhost:2181

ls /

create /my-node "foo"       // create a node with "foo" as the data
ls /
create /my-node/new-node "some data"
create /my-node/another-node ""
get /my-node/new-node
 
rmr /my-node/another-node     // remove node recursively   
ls /my-node 
rmr /my-node
ls /

create /my-node-to-watch "some data"
get /my-node true            # set a watch on the node
set /my-node "new data"      # now we can see a watch message  "WatchedEvent state:SyncConnected type:NodeDataChanged ... "
set /my-node "whatever"      # this time we cannot see any watch message as watch event only happens once

```

////////////////////////////////////////////////////////////////////////////////////////////////
## Four Letter Words   

```sh
#!/bin/bash
# https://zookeeper.apache.org/doc/r3.4.8/zookeeperAdmin.html#sc_zkCommands
# conf
# New in 3.3.0: Print details about serving configuration.
echo "conf" | nc localhost 2181         # show configuration.   

# cons
# New in 3.3.0: List full connection/session details for all clients connected to this server. Includes information on numbers of packets received/sent, session id, operation latencies, last operation performed, etc...
echo "cons" | nc localhost 2181         # how many nodes are connected to zookeeper

# crst
# New in 3.3.0: Reset connection/session statistics for all connections.
# echo "crst" | nc localhost 2181

# dump
# Lists the outstanding sessions and ephemeral nodes. This only works on the leader.
echo "dump" | nc localhost 2181

# envi
# Print details about serving environment
echo "envi" | nc localhost 2181

# ruok
# Tests if server is running in a non-error state. The server will respond with imok if it is running. Otherwise it will not respond at all.
echo "ruok" | nc localhost 2181
# A response of "imok" does not necessarily indicate that the server has joined the quorum, just that the server process is active and bound to the specified client port. Use "stat" for details on state wrt quorum and client connection information.

# srst
# Reset server statistics.
# echo "srst" | nc localhost 2181

# srvr
# New in 3.3.0: Lists full details for the server.
echo "srvr" | nc localhost 2181       # useful !!!!!!!!

# stat
# Lists brief details for the server and connected clients.
echo "stat" | nc localhost 2181

# wchs
# New in 3.3.0: Lists brief information on watches for the server.
echo "wchs" | nc localhost 2181

#wchc
#New in 3.3.0: Lists detailed information on watches for the server, by session. This outputs a list of sessions(connections) with associated watches (paths). Note, depending on the number of watches this operation may be expensive (ie impact server performance), use it carefully.
echo "wchc" | nc localhost 2181

# wchp
# New in 3.3.0: Lists detailed information on watches for the server, by path. This outputs a list of paths (znodes) with associated sessions. Note, depending on the number of watches this operation may be expensive (ie impact server performance), use it carefully.
echo "wchp" | nc localhost 2181

# mntr
# New in 3.4.0: Outputs a list of variables that could be used for monitoring the health of the cluster.
echo "mntr" | nc localhost 2181          # for monitoring


```




