
# submission of jobs and running queries    

```sh
klist    # and it shows no credentials cache found . now it doesn't have ticket

hadoop fs -ls /user   # and receive warning information
hadoop jar /opt/cloudera/parcels/CDH/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10   # it will fail as it doesn't have kerberos ticket

kinit usera    # initialize a ticket for usera
klist          # we can see the ticket
hadoop fs -ls /user    # we can see it succeeds
hadoop jar /opt/cloudera/parcels/CDH/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10   # we can see it succeeds

# beeline      
beeline
> !connect jdbc:hive2://ip-10-0-0-199.ec2.internal:10000/default   # unsupported mechanism type PLAIN
> !connect jdbc:hive2://ip-10-0-0-199.ec2.internal:10000/default;principal=hive/ip-10-0-0-199.ec2.internal@HADOOPSECURITY.COM     # Then the connection is successful
> create table a(b string);
> describe table a;
```



