

Sqoop


```sh
1 tools for bulk data import from structured data sources such as RDBMS, Data Warehouses to HDFS
2 It can import all tables, a single table, or a portion of a table into HDFS
3 Sqoop can also export data from HDFS back to the database
```

Sqoop stands for SQL + Hadoop = Sqoop
```sh
it is a single client program that interacts with hadoop file system to create one or more mapreduce programs
sqoop uses primary key column to divide source data across it's mappers
by default sqoop will spawn 4 mappers
sqoop works with anything that is JDBC compliant
```

sqoop1  
!(sqoop1)[pics/sqoop1.PNG]



sqoop2  
!(sqoop2)[pics/sqoop2.PNG]



sqoop and Oozie  
!(sqoop2)[pics/sqoopOozie.PNG]


