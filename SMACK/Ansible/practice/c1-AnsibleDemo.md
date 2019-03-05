
# Ansible Demo    

```
Ansible demo
Why do DevOps
Why choose Ansible
Installing Ansible
Running Ansible commands
```

## waht is Ansible    

Ansible is an automation tool
```
1 automate repetitive installation and configuration of software
2 do it reliably
3 build a reusable library of automation
```

```
Development
Keep the team consistent

Build Server
Know that you can re-create your build environment

Production
Deliver software the right way every time
```

## Ansible Demo
```
install DotCMS(open source content management server)
1 deploy to Amazon web services instances (vanilla Ubuntu 16.04 LTS plus Python 2.7)
2 install and configure a PostgreSQL database server
3 Install and configure Java and DotCMS
```

```sh
ansible-playbook -i inventory playbook.yaml --vault-password-file .vault-pass.txt
```


