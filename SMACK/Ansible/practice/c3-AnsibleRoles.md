
```
Creating and using roles
Common Ansible modules
Ansible Galaxy
Role handlers, files, template4s, and dependencies
```

# Create and Use Roles    

```
Organizing playbooks using roles
Using roles in playbooks
```

```
Roles help us build a reusable library of automation
```


Roles Capture Important Information 
```
Tasks
Action for automatic install and config

Files
Configuration files, including customizable templates

Variables 
Separate configuration choices to make them easier to see
```

Role Directory Components
```
defaults - default configuration variables
files - files to deploy to the remote system
handlers - conditional tasks that run if notified
meta - role metadata (for example - dependencies)
tasks - main entry point, actions to complete
templates - customizable files to deploy 
vars - high priority configuration variables
```

roles/dotcms/defaults/main.yaml
```yaml
---
dotcms_path: /opt/dotcms
dotcms_user: dotcms
dotcms_group: dotcms
dotcms_db_name: dotcms
dotcms_db_user: dotcmsuser
```

roles/dotcms/handlers/main.yaml
```yaml
---
- name: dotcms reload systemd
  command: systemctl daemon-reload
```

roles/dotcms/tasks/main.yaml
```yaml
---
- name: group
  group: name={{ dotcms_group }} state=present

- name: user
  user:
    name: "{{ dotcms_user }}"
    group: "{{ dotcms_group }}"
    home: "{{ dotcms_path }}"
    state: present
    system: yes
    
- name: installation directory
  file: 
    name: "{{ dotcms_path }}"
    state: directory
    owner: "{{ dotcms_user }}"
    group: "{{ dotcms_group }}"
    mode: 0755
    
- name: install
  unarchive:
    src: "{{ dotcms_archive_file }}"
    dest: "{{ dotcms_path }}"
    owner: "{{ dotcms_user }}"
    group: "{{ dotcms_group }}"
    creates: "{{ dotcms_path }}/bin/startup.sh"  

- name: context xml
  template:
    src: context.xml
    dest: "{{ dotcms_path }}/dotserver/tomcat-{{ dotcms_tomcat_version  }}/webapps/ROOT/META-INF/context.xml"
    owner: "{{ dotcms_user }}"
    group: "{{ dotcms_group }}"
    mode: 0644 
    
- name: service file
  template:   
    dest: /lib/systemd/system/dotcms.service
    src: dotcms.service
    mode: 0644
    owner: root
    group: root
  notify:
    - dotcms reload systemd
    
- meta: flush_handlers

- name: service
  service: name=dotcms state=started enabled=yes
    
```

roles/dotcms/templates/context.xml
```xml
<Context path="${catalina.home}/webapps/ROOT" docBase="${catalina.home}/webapps/ROOT" ...>

<Resources alloLinking="true" />

...

    <Loader delegate="true"/> 

    <Resource name="mail/MailSession" auth="Container" type="javax.mail.Session" mail.smtp.host="localhost" />

    <Resource name="jdbc/dotCMSPool" auth="Container" 
        type="javax.sql.DataSource"
        factory="org.apache.comcat.jdbc.pool.DataSourceFactory"
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://{{ dotcms_database_host }}/{{ dotcms_db_name }}"
        .... 
                 />

```


the following playbook uses role    
playbook.yaml
```yaml
---
- hosts: database
  become: true
  roles:
    - postgresql
- hosts: dotcms
  become: true
  roles:
    - java
    - dotcms    
```

# applying commonly used modules   

```
packaging modules
files modules
system modules
```

## packaging modules - installing OS packages   

```yaml
- name: install jre
  package: name=openjdk-8-jre state=installed
```

```yaml
- name: nodesources repository
  yum_repository:
    name: nodesource
    description: Nodesource Yum Repo
    baseurl: https://rpm.nodesource.com/pub_8.x/el/7/$basearch/
```

Python packages
```yaml
- name: tensorflow
  pip:
    name: tensorflow
    virtualenv: /opt/tensorflow
```

Rubygenm
```yaml
- name: rake
  gem: 
    name: rake
    state: present
```

## packaging modules - installing Files Modules   

copy file to remote system
```yaml
- name: configure
  copy: 
    src: postgresql.conf
    dest: /etc/postgresql/9.5/main/postgresql.conf
    owner: postgres
    group: postgres
    mode: 0644
  notify:
    - restart postgresql  
```

copy file, but update based on variables
```yaml
- name: context xml
  template:
    src: context.xml
    dest: "/opt/dotcms/dotserver/tomcat-8.0.18/webapps/ROOT/MEAT-INF/context.xm."
    owner: "dotcms"
    group: "dotcms"
    mode: 0644
```

create/delete files/dirs
```yaml
- name: installation directory
  file: 
    name: "/opt/dotcms"
    state: directory
    owner: "dotcms"
    group: "dotcms"
    mode: 0755
```

update a line in a files
```yaml
- name: ensoure localhost in hosts
  lineinfile: 
    path: /etc/hosts
    regexp: '^127\.0\.0\.1'
    line: '127.0.0.1 localhost'
    owner: root
    group: root
    mode: 0644
```

Extract from tar, zip and so on
```yaml
- name: install
  unarchive:  
    src: "/opt/dotcms.tar.gz"
    dest: "/opt/dotcms"
    owner: "dotcms"
    group: "dotcms"
    creates: "/opt/dotcms/bin/startup.sh"
```

## packaging modules - System Modules    

```yaml
- name: service
  service: name=dotcms state=started enabled=yes
```

```yaml
- name: group
  group: name=dotcms state=present
```

```yaml
- name: schedule yum autoupdate
  cron: 
    name: yum autoupdate
    weekday: 2
    minute: 0
    hour: 12
    user: root
    job: "YUMINTERACTIVE: 0 /usr/sbin/yum-autoupdate"

```

```yaml
- name: user
  user: 
    name: "dotcms"
    group: "dotcms"
    home: "/opt/dotcms"
    state: present
    system: yes
```

```yaml
- name: allow httpd to make network connections
  seboolean:
    name: httpd_can_network_connect
    state: yes
    presistent: yes
```

# getting roles from Ansible Galalxy   

**Ansible Galaxy** refers to the Galaxy website where users can share roles, and to a command line tool for installing, creating and managing roles. Topics. Ansible Galaxy.


