


## theory

VPN
```
Authentication
Tunneling
Encryption
```


network   
A **gateway** is a piece of networking hardware used in telecommunications for telecommunications networks that allows data to flow from one discrete network to another. 

**CIDR** (Classless Inter-Domain Routing, sometimes called supernetting) is a way to allow more flexible allocation of Internet Protocol (IP) addresses than was possible with the original system of IP address classes.
```
CIDR notation
CIDR notation is a compact representation of an IP address and its associated routing prefix. The notation is constructed from an IP address, a slash ('/') character, and a decimal number. The number is the count of leading 1 bits in the subnet mask. Larger values here indicate smaller networks. The maximum size of the network is given by the number of addresses that are possible with the remaining, least-significant bits below the prefix.

The IP address is expressed according to the standards of IPv4 or IPv6. The address may denote a single, distinct interface address or the beginning address of an entire network. The aggregation of these bits is often called the host identifier.

For example:

192.168.100.14/24 represents the IPv4 address 192.168.100.14 and its associated routing prefix 192.168.100.0, or equivalently, its subnet mask 255.255.255.0, which has 24 leading 1-bits.
the IPv4 block 192.168.100.0/22 represents the 1024 IPv4 addresses from 192.168.100.0 to 192.168.103.255.
the IPv6 block 2001:db8::/48 represents the block of IPv6 addresses from 2001:db8:0:0:0:0:0:0 to 2001:db8:0:ffff:ffff:ffff:ffff:ffff.
::1/128 represents the IPv6 loopback address. Its prefix length is 128 which is the number of bits in the address.
For IPv4, CIDR notation is an alternative to the older system of representing networks by their starting address and the subnet mask, both written in dot-decimal notation. 192.168.100.0/24 is equivalent to 192.168.100.0/255.255.255.0.
```



## AWS implementation   

A Site-to-Site VPN connection consists of the following components.
```
1 Virtual Private Gateway
A virtual private gateway is the VPN concentrator on the Amazon side of the Site-to-Site VPN connection. 

2 Customer Gateway
A customer gateway is a physical device or software application on your side of the Site-to-Site VPN connection.
```




customer gateway

virtual private gateway

site-to-site VPN connections


## practice    

VPN


