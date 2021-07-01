import React from "react";
import { gql, useQuery } from "@apollo/client";
import { CreatedBy, UserStatus } from "@/generated/graphql";
import { initializeApollo } from "@/utils/client";

const UserQueryDocument = gql`
  query Users {
    users {
      id
      username
      password
      status
      createdBy
      createdAt
      updatedAt
    }
  }
`;

interface UserQuery {
  users: {
    id: number;
    username: string;
    password: string;
    status: UserStatus;
    createdBy: CreatedBy;
    createdAt: string;
    updatedAt: string;
  }[];
}

const Index = () => {
  const { data } = useQuery<UserQuery>(UserQueryDocument);
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

  await apolloClient.query<UserQuery>({
    query: UserQueryDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Index;
