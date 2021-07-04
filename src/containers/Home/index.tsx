import React from "react";
import { initializeApollo } from "@/utils/client";
import { UsersDocument, UsersQuery, useUsersQuery } from "@/generated/client";

const Index = () => {
  const { data } = useUsersQuery();
  const users = data?.users;
  return (
    <>
      <h1>Home Page</h1>
      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              Username: {user.username} ({user.status})
            </div>
          );
        })}
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
