

```
Configuring inventory and playbooks
Using tasks and handlers
```

# ansible inventory file

```
running ansible-playbook
creating an ansible inventory file
configuring systems for SSH
```

**running ansible-playbok instead of ansible**: ansible-playbook lets us place Ansible configuraiton into files so we can reliably run the same set of commands over and over


Ansible Inventory File
```
controls what systems are used for ansible-playbook
allows for per-system configuration
INI file format
```

default inventory file location -- /etc/ansible/hosts

# configuring Systems for SSH

**Default configuration location** $HOME/.ssh/config

Ansible expects to be able to connect to systems in the inventory by SSH

```
Host database* dotcms* ansible server* web*
  User ubuntu
  IdentityFile ~/.ssh/id_rsa_aws
Host web01
  Hostname xx.xxx.xx.xx
Host web02
  Hostname xx.xxx.xx.xx
Host web03
  Hostname xx.xxx.xx.xx
Host web04
  Hostname xx.xxx.xx.xx    
```

cat inventory
```yaml
[database]
database01

[dotcms]
dotcms01
```

cat /home/UserName/.ssh/config
```yaml
Host database* dotcms* ansible server* web*
  User ubuntu
  IdentityFile ~/.ssh/id_rsa_aws
Host database01
  Hostname xx.xxx.xxx.xxx
Host dotcms01
  Hostname xx.xxx.xxx.xxx
 
```

```
ansible-playbook -i inventory playbook.yaml --vault-password-file .vault-pass.txt
```


# introduction to Playbooks

```
Playbook file
Playbooks and plays
Basic YAML syntax
```

each command Ansible applies to a remote system is called a task
```yaml
- name: install jre
  package: name=openjdk-8-jre state=installed
```

a play groups tasks together
```yaml
- hosts: all
  become: true
  tasks:
    - name: install jre
      package: name=openjdk-8-jre state=installed
    - name: group
      group:
        name: dotcms
        state: present
- hosts: balancer  
  become: true
  tasks:
    - name: install haproxy
      package: name=haproxy state=installed      
```

is equivalent to the json file:

```json
[
	{
		"hosts": "all",
		"become": true,
		"tasks": [
			{
				"name": "install jre",
				"package": "name=openjdk-8-jre state=installed"
			},
			{
				"name": "group",
				"group": {
					"name": "dotcms",
					"state": "present"
				}
			}
		]
	},
	{
		"hosts": "balancer",
		"become": true,
		"tasks": [
			{
				"name": "install haproxy",
				"package": "name=haproxy state=installed"
			}
		]
	}
]
```

# using tasks and handlers

```
tasks 
handlers
```

**task**


```yaml
- name: install jre
  package: name=openjdk-8-jre state=installed
```

```yaml
- service: name=dotcms state=started enabled=yes
```

```yaml
- service: 
    name:dotcms
    state:started
    enabled:yes
```

use variables
```yaml
- name: install
  unarchive:
    src: "{{ dotcms_archive_file }}"
    dest: "{{ dotcms_path }}"
    owner: "{{ dotcms_user }}"
    group: "{{ dotcms_group }}"
    creates: "{{ dotcms_path }}/bin/startup.sh"

```

**Handlers**: handlers are just like tasks, but they only run if notified    
```yaml
# only restart postgreSQL if the configuration file has changed

- name: configure
  copy:
    src: postgresql.conf
    dest: /etc/postgresql/{{ postgresql_version }}/main/postgresql.conf
    owner: postgres
    group: postgres
    mode: 0644
  notify:
    -- restart postgresql  

- name: restart postgresql
  service: name=postgresql state=restarted

```

flushing handler: sometimes we need handlers to run before another task   

Ansible has a meta command flush_handlers to do this
```yaml
- meta: flush_handlers
```

```sh
ansible-playbook -i inventory db.yaml
```

# configuring systems through the inventory   

```
customizing SSH connections
Ansible Become
Going beyond SSH
```

**customizing SSH connections**
```
customize connections to systems in the inventory using parameters
control IP address, user name, sudo to root, and location of Python
```

```yaml
web01 ansible_hostname=xx.xxx.xxx.xxx ansible_user-ubuntu
web02 ansible_hostname=xx.xxx.xxx.xxx ansible_user-ubuntu
web03 ansible_hostname=xx.xxx.xxx.xxx ansible_user-ubuntu
web04 ansible_hostname=xx.xxx.xxx.xxx ansible_user-ubuntu

# after ansible ssh login, it uses ssh to implement privilege escalation
web01 ansible_become_user-lroot  

```

Become is Ansible's generic term for privilege escalation    
**task level will override play level, and play level will override host level**

going beyond SSH
```
ansible supports other ways of controlling systems, including:
local (directly on localhost)
winrm (windows remote management)
docker (docker exec)
```

# creating inventory groups    

```
adding systems to groups
group variables in inventory
assigning plays to systems and groups
```

inventory file
```yaml
[database]
database01 ansible_user=ubuntu

[dotcms]
dotcms01
dotcms02
dotcms03

[balancer]
balancer01

[ubuntu:children]
database
dotcms

[ubuntu:vars]
ansible_user=ubuntu

[alpine:children]
balancer

[alpine:vars]
ansible_user=root
```

then in playbook.yaml
```yaml
- hosts: all
  become: true
  tasks:  

- hosts: alpihe
  become: true
  tasks:  

- hosts: ubuntu 
  become: true
  tasks: 

```


