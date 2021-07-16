import React from "react";
import { initializeApollo } from "@/utils/client";
import { UsersDocument, UsersQuery, useUsersQuery } from "@/generated/client";

const Index = () => {
  const { data } = useUsersQuery();
  const users = data?.users;
  return (
    <>
      <h1>Dashboard Page</h1>
    </>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<UsersQuery>({
    query: UsersDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Index;
