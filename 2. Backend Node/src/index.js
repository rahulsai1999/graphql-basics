import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";

import * as Query from "./resolvers/Query";
import * as Mutation from "./resolvers/Mutation";
import * as Subscription from "./resolvers/Subscription";
import * as User from "./resolvers/User";
import * as Link from "./resolvers/Link";
import * as Vote from "./resolvers/Vote";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log(`Server running on http://localhost:4000`));
