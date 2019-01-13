
# Data ingestion   

Data ingestion is the process of obtaining and importing data for immediate use or storage in a database. To ingest something is to "take something in or absorb something." Data can be streamed in real time or ingested in batches.


# landing:   

```
There is a lot of talk in the private sector about the big data ‘landing area,’ though definitions offered by technology evangelists and corporate executives are often divergent or vague. In some cases, these areas are where information is aggregated, cleaned and analyzed. In other situations, these regions consist of where the assets were originally conceived. Decision-makers need to define this concept, and many are choosing to consider the data warehousing environment to be where all the magic happens.

A landing area can be used to acquire and collect data from any number of sources before it is sent downstream. The landing area can also be used for numerous pre-analysis tasks. This might include data aggregation, cleaning, or merging.

The role of a big data landing area is deliberately vague. It’s clearly not the production front-end access and sandboxing layer where you run your fast queries, do your interactive exploration, and build and score your predictive models. It’s clearly not the production hub layer, where you store your core system-of-reference data, manage metadata, and enforce data governance standards
```

# data application platform (DAP)   

```
DAP: 
The pattern-based factory approach used for ingestion   
```

# Kerberos   

```
Kerberos is a computer network authentication protocol that works on the basis of tickets to allow nodes communicating over a non-secure network to prove their identity to one another in a secure manner.

Kerberos is a network authentication protocol. It is designed to provide strong authentication for client/server applications by using secret-key cryptography. A free implementation of this protocol is available from the Massachusetts Institute of Technology.

```


# Hive   

```
Hive use language called HiveQL(HQL), which is similar to SQL. HiveQL automatically translates SQL-like queries into MapReduce jobs. The Hive generally runs on your workstation and converts your SQL query into a series of jobs for execution on a Hadoop cluster. Apache Hive organizes data into tables.
```

# data lake     

```
A data lake is a system or repository of data stored in its natural format, usually object blobs or files. A data lake is usually a single store of all enterprise data including raw copies of source system data and transformed data used for tasks such as reporting, visualization, analytics and machine learning.

A data lake is a storage repository that holds a vast amount of raw data in its native format until it is needed. While a hierarchical data warehouse stores data in files or folders, a data lake uses a flat architecture to store data. Each data element in a lake is assigned a unique identifier and tagged with a set of extended metadata tags. When a business question arises, the data lake can be queried for relevant data, and that smaller set of data can then be analyzed to help answer the question.
```

# HDP(Hortonworks Data Platform)    
Hortonworks Data Platform (HDP) 

# HDF(Hortonworks DataFlow)    

Hortonworks DataFlow (HDF) is a scalable, real-time streaming analytics platform that ingests, curates and analyzes data for key insights and immediate actionable intelligence. DataFlow addresses the key challenges enterprises face with data-in-motion—real-time stream processing of data at high volume and high scale, data provenance and ingestion from IoT devices, edge applications and streaming sources.

# CDH for coudera   

CDH is Cloudera's software distribution containing Apache Hadoop and related projects.

```sh
Apache Hadoop (Core)
Reliable, scalable distributed storage and computing

Apache Accumulo
A secure, distributed data store to serve performance-intensive Big Data applications

Apache Flume
For collecting and aggregating log and event data and real-time streaming it into Hadoop

Apache HBase
Scalable record and table storage with real-time read/write access

Apache Hive
Familiar SQL framework with metadata repository for batch processing of Hadoop data

HUE
The extensible web GUI that makes Hadoop users more productive

Apache Impala
The data warehouse native to Hadoop for low-latency queries under multi-user workloads

Apache Kafka®
The backbone for distributed real-time processing of Hadoop data

Apache Pig
High-level data flow language for processing data stored in Hadoop

Apache Sentry
Fine-grained, role-based authorization for Impala and Hive

Cloudera Search
Powered by Solr to make Hadoop accessible to everyone via integrated full-text search

Apache Spark™
The open standard for in-memory batch and real-time processing for advanced analytics

Apache Sqoop
Data transport engine for integrating Hadoop with relational databases

```

