


## Start a Hive shell locally    
```
You can start the Hive shell, which uses Beeline in the background, to enter HiveQL commands on the command line of a node in a cluster.
```

**Start Hive**
```sh
hive
>hive
```

## HiveServer2    

HiveServer2 (HS2) is a service that enables clients to execute queries against Hive.

HiveServer2 (HS2) is a server interface that enables remote clients to execute queries against Hive and retrieve the results (a more detailed intro here). The current implementation, based on Thrift RPC, is an improved version of HiveServer and supports multi-client concurrency and authentication. It is designed to provide better support for open API clients like JDBC and ODBC.


## Beeline 

HiveServer2 supports a command shell Beeline that works with HiveServer2. It's a JDBC client that is based on the SQLLine CLI (http://sqlline.sourceforge.net/). There’s detailed documentation of SQLLine which is applicable to Beeline as well.

**start beeline**

```sh
$ >beeline
beeline> !connect jdbc:hive2://localhost:10000 scott tiger
```

## hive2 action   

The hive2 action runs Beeline to connect to Hive Server 2.

## Beeline vs Hive CLI    

Comparing Beeline to the Hive CLI

HDP supports two Hive clients: the Hive CLI and Beeline. The primary difference between the two involves how the clients connect to Hive.

**The Hive CLI, which connects directly to HDFS and the Hive Metastore,** and can be used only on a host with access to those services.

**Beeline, which connects to HiveServer2 and requires access to only one .jar file: hive-jdbc-<version>-standalone.jar.**

**Hortonworks recommends using HiveServer2 and a JDBC client (such as Beeline) as the primary way to access Hive.** This approach uses SQL standard-based authorization or Ranger-based authorization. However, some users may wish to access Hive data from other applications, such as Pig. For these use cases, use the Hive CLI and storage-based authorization.


