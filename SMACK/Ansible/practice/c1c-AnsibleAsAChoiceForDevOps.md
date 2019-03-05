
Ansible as a choice for DevOps



```
Ansible agentless architecture
YAML - not just another markup language
Ansible design approach
```

# Ansible Agentless Architecture     

Ansible only need to connect to the machine via SSH, but doesn't need agents installed on target machine.   

Ansible only need to be installed on Controller machine    

```yaml
- service:
    name: dotcms
    state: started
    enabled: yes
```
or use ansible shorthand
```yaml
- service: name=dotcms state=started enabled=yes
```

# ansible design approach    

```
ansible runs plays start-to-finish
```

```
behavior is easier to understand
changes can overlap
easier to sue during build and install
```

