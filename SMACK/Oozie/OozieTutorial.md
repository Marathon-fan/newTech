
## Oozie Examples    

Oozie solve the problem:   

```
1 Doing something on the grid often requires multiple steps
MapReduce job
Pig job
Streaming job
HDFS operation (mkdir, chmod, etc)...

2 Multiple ad-hoc solution existed
custom job control
shell scripts
cron..

3 Cost of building and running apps were high
development and applications engineering
support, operations, and hardware

```

![OozieTutorial1](pics/OozieTutorial1.png)

![OozieTutorial1](pics/OozieTutorial2.png)

**control-flow nodes**   
start, kill, end, fork, join, decision   

**action nodes**  
map reduce job, pig script, hive(hive query, HiveServer2 Script), Spark program, distcp, java program, Sqoop 1, fs(like HDFS fs), sub-workflow, shell, ssh, email, Sub workflow, Streaming,    

## write a Oozie workflow(example)   

prepare the following files   
```sh
1 you need the JAR file   
2 workflow.xml    
3 job.properties   
```

for example(example1)
```sh
in Oozie examples, we see Hive example   (examples/apps/hive)
0 README
1 job.properties
2 script.q
3 workflow.xml
4 workflow.xml.security
```

for example(example2)   
```sh
in Oozie examples, we see map reduce example   (examples/apps/map-reduce)
1 job.properties    --- all the property values are defined here. they can used for oozieEL (Expression Language) functions    
2 workflow.xml      --- what we need to do is defined here. it can have start, action(like map-reduce, pig, hive, etc),    
                    --- the trick here are that all property values in workflow.xml are defined in job.properties, so that by only changing job.properties we can execute the job in another platform(cluster environment)

3 job-with-config-class.properties
4 workflow-with-config-class.xml
5 lib/oozie-examples-4.1.0-cdh5.8.0.jar

we use the following cmd to submit Oozie job:
oozie job -oozie http://localhost:11000/oozie -config examples/apps/map-reduce/job.properties -run   

then we go to oozie web page to see the oozie job status
navigate to xxx:11000/oozie

```


## Oozie co-ordinator﻿   
```
Use co-ordinator﻿ to run daily at particular time stamp 
```

## Resouce manager       
Which component of YARN will accept a program?   
answer: **Resouce manager**   

job-tracker is the Hadoop1's name, later it's called **resource manager**    


