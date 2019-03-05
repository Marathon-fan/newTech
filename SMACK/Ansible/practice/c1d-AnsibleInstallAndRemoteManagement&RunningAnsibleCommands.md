

```sh
# as the root
apt-get install -y python-pip
pip install ansible
ansible --version

# register the public key in the remote server    
ssh remoteServerIP
ls .ssh
cat .ssh/authorized_keys
sudo su -
less /etc/sudoers.d/90-cloud-init-users

# run ansible
ansible all -i remoteServerIP, -m ping

ansible all -i web01,web02,web03,web04 -m ping

ansible all -i web01,web02,web03,web04 -m command --args 'uptime'

ansible all -i web01,web02,web03,web04 -m command --args 'sudo apt-get install -y apache2'


```


# summary

```
DevOps - idempotence and immutable infrastructure
Ansible as a choice for DevOps
Ansible commands
```

