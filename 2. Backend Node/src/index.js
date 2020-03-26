import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

//3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server running on http://localhost:4000`));
