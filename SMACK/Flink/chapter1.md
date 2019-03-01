
## Batch Processing vs Stream Processing     

**Batch Processing**    
A set of data is collected over a period of time and then processed at a single shot    

A Batch job is run at regular interval or on demand with a Bounded dataset

```
A set of data is collected over a period of time and then perocessed at a single shot

used when access to all the data is required
-- difference in sales after discount
-- find loyal customers of a bank
```

more concerned about throughput than latency

Example: Hadoop    

**Stream Processing**    
Data is fed to processing engine as soon as it is generated   

A Streaming job runs continuously whenever data is available with Unbounded data

```
used to process Read-time data
-- Fraud detection
-- Social media Sentiment analysis
```

more concnerned about latency than throughput    

Example: Spark and Flink   


## Spark and Flink(in-memory computation)      

Spark --  RDD, DF(data frame)    
Spark --  Mlib     

Flink --  Dataflows     
Flink --  FlinkML    

```
Flink is implemented in java    
Flink has it's own efficient automatic memory manager(rerely gets out of memory)
Flink uses controlled cyclic Dependency graph as its execution engine    
```

Flink Architecture/Ecosystem    

```

Zeepelin

Table, Gelly, FlinkML


Dataset                         DataStream
(Batch processing)              (Stream processing)

Flink's runtime

Local JVM       cluster standalone/Yarn             Cloud GCE/EC2

Files Local HDFS, S3        Databases MongoDB, HBase         Streams Kafka Flume RabbitMq
```

Flink Programming model | Flow of a Flink program     
```
Source(File, Kafka, Flume, Socket)      ------------> Operations or Transformations  ---------> sink (HDFS, Database, Memory)
```

## install Flink   

```sh
# download Flink  
# upload it to AWS

aws s3 ls

# download it from s3   

sudo aws s3 cp s3://pathToYourBucket/flink-1.7.2-bin-hadoop28-scala_2.11.tgz .  

sudo tar xzf flink-1.7.2-bin-hadoop28-scala_2.11.tgz

cd flink-1.7.2/

./bin/start-cluster.sh



```


## install Java 8  and set up JAVA_HOME
```sh
Please specify JAVA_HOME. Either in Flink config ./conf/flink-conf.yaml or as system-wide JAVA_HOME.

sudo yum install java-1.8.0
sudo yum remove java-1.7.0-openjdk

sudo nano ~/.bash_profile 

# under amazon linux
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.191.b12-0.amzn2.x86_64/jre
export PATH=$PATH:$JAVA_HOME

source ~/.bash_profile


```




