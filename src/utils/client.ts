import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PrismaClient } from "@prisma/client";

type MyApolloCache = any;
let apolloClient: ApolloClient<MyApolloCache> | undefined;

const createIsomorphLink = () => {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("@/apollo/schema");
    const { db } = require("@/apollo/db");
    const prisma = new PrismaClient();
    return new SchemaLink({ schema, context: { db, prisma } });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: process.env.GRAPHQL_URL_BACK_OFFICE,
      credentials: "same-origin",
    });
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState: MyApolloCache | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

const UseApollo = (initialState: MyApolloCache) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
export default UseApollo;
