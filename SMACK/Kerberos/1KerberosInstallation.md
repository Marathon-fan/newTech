
# Authentication with Kerberos


## install MIT kerberos - 1

ls
```sh
UnlimitedJCEPolicy   
clustercmd.sh
notes
cm                   # cluster manager
cluster              # a list of node in the cluster
...
hadoopsecurity.pem   # use the key to access the cluster
```

cat cluster
```sh
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
ec2-xx-xx-xx-xx.compute-1.amazonaws.com
```

ssh to the cluster manager and on that node install mit ktc
```sh
ssh -i ./hadoopsecurity.pem ec2-user@`cat cm`

# now is on the cluster manager
sudo yum install krb5-server
hostname -f # then record the hostName
sudo vi /etc/krb5.conf # then remove [domain_realm]
                       # change EXAMPLE.COM to the real name    using cmd: l,$ s/EXAMPLE.COM/HADOOPSECURITY.COM/g
                       # set the kdc in realms = hostName, admin_server = hostName 
                       # adding encrypt string to [libdefaults]

sudo vi /var/kerberos/krb5kdc/kadm5.acl
                       # then add "*/admin@HADOOPSECURITY.COM  *" to this file(like ACL)

sudo vi /var/kerberos/krb5kdc/kdc.conf
                       # change EXAMPLE.COM TO HADOOPSECURITY.COM using cmd: l,$ s/EXAMPLE.COM/HADOOPSECURITY.COM/g
                       # also add "max_renewable_life = 7d" to HADOOPSECURITY.COM
                       # also add the following string to HADOOPSECURITY.COM "supported_enctypes = aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal  arcfour-hmac-md5:normal"
sudo kdb_util create
sudo kdb5_util create
sudo service krb5kdc start
sudo service kadmin start
exit

# the copy the file to localhost
scp -i ./hadoopsecurity.pem ec2-user@`cat cm`:/etc/krb5.conf ./



```

encrypt string
```
default_tkt_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96 arcfour-hmac-md5
default_tgs_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96 arcfour-hmac-md5
permitted_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96 arcfour-hmac-md5
```

## install MIT kerberos - 2

```sh
cat clustercmd.sh

# and we see the following content
for i in `cat cluster`; do
ssh -t -i ./hadoopsecurity.pem ec2-user@i $*
done

# then we install krb5-workstation on every node
sh ./clustercmd.sh sudo yum install krb5-workstation    

cat putnmove.sh # put and move
# and we see the following content
SOURCE=$1
TARGET=$1
INTERIM=`basename $SOURCE`

for i in `cat cluster`; do
scp -i ./hadoopsecurity.pem $SOURCE ec2-user@$i:~/
ssh -t -i ./hadoopsecurity.pem ec2-user@$i "sudo cp $INTERIM $TARGET"
done

# then we call the sh cmd
./putnmove.sh ./krb5.conf /etc/krb5.conf
./putnmove.sh UnlimitedJCEPolicy/US_export_policy.jar /usr/java/jdk1.7.0_67-cloudera/jre/lib/security

```

## install MIT kerberos - 3  

# then we begin to test 
```sh
# login to cm node
ssh -i ./hadoopsecurity.pem ec2-user@`cat cm`
sudo kadmin.local
addprinc cm/admin
exit

# then we login to another node
ssh -i ./hadoopsecurity.pem ec2-user@ec2-xx-xx-xx-xxx.compute-1.amazonaws.com
kinit cm/admin


```
