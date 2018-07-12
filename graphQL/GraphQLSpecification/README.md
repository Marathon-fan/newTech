
# Overview  
GraphQL is a query language designed to build client applications by providing an intuitive and flexible syntax and system for describing their data requirements and interactions.

GraphQL is a language used to query application servers that have capabilities defined in this specification.

GraphQL has a number of design principles:
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Hierarchical`
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Product‐centric `
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Strong‐typing`
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Client‐specified queries`
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Introspective`

## core concepts   

### document   
A document may contain operations (queries, mutations, and subscriptions) as well as fragments, a common unit of composition allowing for query reuse.

A GraphQL document is defined as a syntactic grammar where terminal symbols are tokens (indivisible lexical units). These tokens are defined in a lexical grammar which matches patterns ofsourcecharacters(definedbyadouble colon::).

### fragments   
a common unit of composition allowing for query reuse.    

Fragments allow for the reuse of common repeated selections of fields, reducing duplicated text in the document. Inline Fragments can be used directly within a selection to condition upon a type condition when querying against an interface or union.

```
query noFragments {
  user(id: 4) {
    friends(first: 10) {
      id
name
      profilePic(size: 50)
    }
    mutualFriends(first: 10) {
      id
name
      profilePic(size: 50)
    }
} }
```

The repeated fields could be extracted into a fragment and composed by a parent fragment or query.
```
query withFragments {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
    mutualFriends(first: 10) {
  ...friendFields
    }
} }
fragment friendFields on User {
  id
name
  profilePic(size: 50)
}
```

### token    
indivisible lexical unit    

### comment   
GraphQL source documents may contain single line comments,starting with the # marker.


### Punctuators   
Punctuator :: one of     
! $ ( ) ... : = @ [ ] { | }



There are three types of operations that GraphQL models:
query–a read-only fetch.
mutation – a write followed by a fetch.
subscription–a long livedrequestthatfetchesdatainresponsetosourceevents.

### Directives   
Directives provide a way to describe alternate runtime execution and type validation behavior in a GraphQL document.

In some cases, you need to provide options to alter GraphQL’s execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.

## Type System    

The GraphQL Type system describes the capabilities of a GraphQL server and is used to determine if a query is valid. The type system also describes the input types of query variables to determine if values provided at runtime are valid.   

```
TypeSystemDefinition: 
    SchemaDefinition
    TypeDefinition
    DirectiveDefinition
```

## Scalar   
A scalar represents a primitive value, like a string or an integer. Oftentimes, the possible responses for a scalar field are enumerable. GraphQL offers an Enum type in those cases, where the type specifies the space of valid responses.    

## IDL   
Interface Definition Language (IDL)

## fragment, interface and union   



