
# Enableing Kerberos in Cloudera

## 

```sh
hadoop fs -ls /user
exit
```

```sh
# add user to each node  
./clustercmd.sh sudo useradd user1 -u 1001
./clustercmd.sh sudo useradd user2 -u 1002
./clustercmd.sh sudo useradd admin -u 1003
./clustercmd.sh sudo useradd bob -u 1004

# login to the kdc host (here the same as cloudera manager)
ssh -i ./hadoopsecurity.pem ec2-user@`cat cm`
sudo kadmin.local
addprinc user1
addprinc user2
addprinc admin
addprinc bob
addprinc hdfs   # hdfs happens to be the root user of hadoop

exit

kinit hdfs
hadoop fs -ls / 
hadoop fs -mkdir /user/user1
hadoop fs -mkdir /user/user2
hadoop fs -mkdir /user/admin
hadoop fs -mkdir /user/bob
hadoop fs -chown user1:user1 /user/user1
hadoop fs -chown user2:user2 /user/user2
hadoop fs -chown admin:admin /user/admin
hadoop fs -chown bob:bob /user/bob

kdestroy
kinit bob

exit

scp -i ./hadoopsecurity.pem sightings.csv ec2-user@ec2-xx-xx-xx-xx1.compute-1.amazonaws.com:~/sightings.csv
ssh -i ./hadoopsecurity.pem ec2-user@ec2-xx-xx-xx-xx1.compute-1.amazonaws.com   # login to this node
kdestroy
kinit user1   
hadoop fs -put sightings.csv
hadoop fs -ls
hadoop fs -ls /user/user1


```


```sh
kinit¶
SYNOPSIS
kinit [-V] [-l lifetime] [-s start_time] [-r renewable_life] [-p | -P] [-f | -F] [-a] [-A] [-C] [-E] [-v] [-R] [-k [-t keytab_file]] [-c cache_name] [-n] [-S service_name] [-I input_ccache] [-T armor_ccache] [-X attribute[=value]] [principal]

DESCRIPTION
kinit obtains and caches an initial ticket-granting ticket for principal.
```

## 


## 



