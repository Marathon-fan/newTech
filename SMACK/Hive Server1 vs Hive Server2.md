Hive Server1 vs Hive Server2

HiveServer2 is an improved version of HiveServer that supports a Thrift API tailored for JDBC and ODBC clients, Kerberos authentication, and multi-client concurrency. 

```
HiveServer2 is an improved version of HiveServer that supports a Thrift API tailored for JDBC and ODBC clients, Kerberos authentication, and multi-client concurrency. The CLI for HiveServer2 is Beeline.

Src: Cloudera
```


```
Hive Server 2 supports Rest API. Tools like beeline can be used to connect from any client outside of your cluster to the hive database. In a secured environment beeline(Hive Rest API client) will connect through knox gateway. Literally there can be multiple beeline connections possible to connect with Hive Server2. So, go with hiveserver2 for more secured and to have multiple connections

```


```
I had the Hive 1 v 2 question and found the basics at:

http://www.slideshare.net/cwsteinbach/hiveserver2-for-apache-hive

HiveServer2 Thrift API spec
JDBC/ODBC HiveServer2 drivers
Concurrent Thrift clients with memory leak fixes and session/config info
Kerberos authentication
Authorization to improve GRANT/ROLE and code injection vectors
```
