import { ApolloServer } from "apollo-server-micro";
import { schema } from "@/apollo/schema";
import { db } from "@/apollo/db";
import { prisma } from "@/utils/prisma-client";

const apolloServer = new ApolloServer({ schema, context: { db, prisma } });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
