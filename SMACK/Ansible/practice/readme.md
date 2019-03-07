
# Ansible     

```
Ansible is an automation tool
Automate repetitive installation and configuration of software
Do ti reliably
Build a reusable library of automation
```

**Ansible uses a combination of a hosts file and a group_vars directory to pull variables per host group and run Ansible plays/tasks against hosts.**

**inventory**  
```
An Inventory is a collection of hosts against which jobs may be launched, the same as an Ansible inventory file. Inventories are divided into groups and these groups contain the actual hosts. Groups may be sourced manually, by entering host names into Tower, or from one of Ansible Tower’s supported cloud providers.

Ansible works against multiple systems in your infrastructure at the same time. It does this by selecting portions of systems listed in Ansible’s inventory, which defaults to being saved in the location /etc/ansible/hosts. You can specify a different inventory file using the -i <path> option on the command line.  

Not only is this inventory configurable, but you can also use multiple inventory files at the same time and pull inventory from dynamic or cloud sources or different formats (YAML, ini, etc), as described in Working With Dynamic Inventory. Introduced in version 2.4, Ansible has inventory plugins to make this flexible and customizable.
```

**task**   
At a basic level, a task is nothing more than a call to an ansible module.    
Each playbook is composed of one or more 'plays' in a list. The goal of a play is to map a group of hosts to some tasks. 

**handler**    
handlers are just like tasks, but they only run if notified    

**play**   
a play groups tasks together      
The goal of a play is to map a group of hosts to some tasks.    

**Ansible Tower**       
Ansible Tower (formerly ‘AWX’) is a web-based solution that makes Ansible even more easy to use for IT teams of all kinds. It’s designed to be the hub for all of your automation tasks.

Tower allows you to control access to who can access what, even allowing sharing of SSH credentials without someone being able to transfer those credentials. Inventory can be graphically managed or synced with a wide variety of cloud sources. It logs all of your jobs, integrates well with LDAP, and has an amazing browsable REST API. Command line tools are available for easy integration with Jenkins as well. Provisioning callbacks provide great support for autoscaling topologies.

