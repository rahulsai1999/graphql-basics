# Basics of GraphQL

**GraphQL** is a new API standard that provides a more efficient, powerful and flexible alternative to REST.

- In short, an API defines how a client can load data from a server.
- At its core, GraphQL enables declarative data fetching where a client can specify exactly what data it needs from an API.
- Instead of multiple endpoints that return fixed data structures, a GraphQL server only exposes a single endpoint and responds with precisely the data a client asked for.
- GraphQL is often confused with being a database technology. This is a misconception, GraphQL is a query language for APIs - not databases.

**Advantages**

- Increased mobile usage creates need for efficient data loading
- Compatible with variety of different frontend frameworks and platforms
- Fast development & expectation for rapid feature development with respect to REST as REST APIs have to be changed with respect to the changing requirements which in turn leads to a change in the structure of the data.

## How it is better than REST?

- REST has become the standard for designing web APIs. It offers some great ideas, such as stateless servers and structured access to resources.
- No more over and under fetching of data
- Faster and rapid iterations for the front-end
- Better analytics insight (fine-grained) for the data on the back-end
- **Strong Type Schema** (GraphQL schema definition language i.e. SDL)
  - This schema serves as the contract between the client and the server to define how a client can access the data.
  - Once the schema is defined, the teams working on frontend and backends can do their work without further communication since they both are aware of the definite structure of the data that’s sent over the network.
  - Frontend teams can easily test their applications by mocking the required data structures. Once the server is ready, the switch can be flipped for the client apps to load the data from the actual API.

## Core Concepts

### Schema Definition Language (SDL)

- Here is an example of how we can use the SDL to define a simple type called Person.
- This type has two fields, they’re called name and age and are respectively of type String and Int. The ! following the type means that this field is required.
- One-to-many-relationship between Person and Post since the posts field on Person is actually an array of posts.

```js
type Person {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
}
type Post {
  id: ID!
  title: String!
  author: Person!
}
```

### Queries

- Queries can be sent to a single endpoint in GraphQL. It’s completely flexible and lets the client decide what data is actually needed.
- That means that the client needs to send more information to the server to express its data needs - this information is called a query.
- The example below shows a normal query and a parameterised query.

```js
query {
  allPersons{
    name
  }
}

query {
    Post(id:4322){
        title
    }
}
```

### Mutations

- Mutations follow the same syntactic structure as queries, which can be used to change data i.e. creating , updating and deleting new and existing data.
- The example below shows the creation of a new entry and gets the auto-generated id in the return data.

```js
mutation {
  createPerson(name: "Bob", age: 36) {
    id
    name
    age
  }
}
```

### Subscriptions

- Subscriptions provide a method for client applications to have a realtime connection to the server to get notified of important events.
- When a client subscribes to an event, it will initiate and hold a steady connection to the server.
- Whenever that particular event then actually happens, the server pushes the corresponding data to the client.
- Unlike queries and mutations that follow a typical “request-response-cycle”, subscriptions represent a stream of data sent over to the client.
- After a client sends this subscription to a server, a connection is opened between them. Then, whenever a new mutation is performed that creates a new Person, the server sends the information about this person over to the client.

```js
subscription {
  newPerson {
    name
    age
  }
}
```

### Schema

- Schema binds together all the queries, mutations, subscriptions into a single collection of GraphQL types.
- Schema contains special root types which are the entry points for the requests sent by the client.

```js
type Query {
  allPersons(last: Int): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
```

## Big Picture (Architecture)

### Use Cases

- **GraphQL server with a connected database**
  - When a query arrives at the GraphQL server, the server reads the query’s payload and fetches the required information from the database.
  - This is called resolving the query. It then constructs the response object as described in the official specification and returns it to the client.
- **GraphQL server as a thin layer** to multiple third party or legacy systems integrated through a single GraphQL API
- **Hybrid approach of connected database and third party systems** accessed through the same GraphQL API

### Resolver functions

- To gain the flexibility of GraphQL, it is necessary to define a proper resolver functions.
- The sole purpose of a resolver function is to fetch the data for its field.
- When the server receives a query, it will call all the functions for the fields that are specified in the query’s payload.
- It thus resolves the query and is able to retrieve the correct data for each field.
- Once all resolvers returned, the server will package data up in the format that was described by the query and send it back to the client.

### GraphQL client libraries

Instead of executing normal REST API calls that involves :

- construct and send HTTP request (e.g. with fetch in Javascript)
- receive and parse server response
- store data locally (either simply in memory or persistent)
- display data in the UI

GraphQL client libraries like Relay and Apollo allow us to :

- define data requirements
- display data in UI