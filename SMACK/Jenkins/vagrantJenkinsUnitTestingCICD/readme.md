
The project map   


# The project map       

## The project map    

This project is a web-based booking application. It contains the following components:       
```
Environment          Number of machines                                   Purpose
Client                  1                                    Mimics the developer machine used to write the application code. Also used for running Ansible against the other environment    

Testing                 2                                    The application server hosting the web application and the database server hosting the backend database

Production              2                                    The application server, the database server
```

## the tools that are used    

```sh
Vagrant for infrastructure provisioning
Ansible for configuration management
Git for version control, GitHub as a central repository
Jenkins as a CI/CD tool
```


## the project branches, environments, unit tests   
```
Three environments:
Feature branch
integration branch
master branch

Two environments:
Development
Production

Unit testing

```

![threeBranchTwoEnvWithUnitTest](./pics/threeBranchTwoEnvWithUnitTest.jpg)

# Lab - Vagrant, Jenkins, Infra, Unit testing, CI, CD    

## Lab1 - Firing up Vagrant       

```sh
vagrant status
cd project
vagrant up web db
```
then we navigate to web by
```sh
vagrant ssh web

```
then we navigate to db by
```sh
vagrant ssh db
mysql -u ci_user -p -pcipassword -h 192.168.33.30

```



## Lab2 - Installing Jenkins   


## Lab3 - Deploying Infrastructure   


## Lab4 - Unit Testing     


## Lab5 - Integration Job     



## Lab6 - Continuous Delivery     


## Lab7 - Continuous Deployment     


# Abbreviations         

EPEL ---- Extra Packages for Enterprise Linux (EPEL). 

