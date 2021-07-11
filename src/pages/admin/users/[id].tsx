import React from "react";

import AppLayout from "@/components/Layout/AppLayout";
import Head from "@/components/Head";
import { useRouter } from "next/router";
import { initializeApollo } from "@/utils/client";
import { UserDocument, UserQuery } from "@/generated/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const UserDetail = ({
  initialApolloState: { user, profile, role },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <AppLayout alwaysDarkMode title="User Informations">
      <Head title="Users" />
      <h1>Hello User {user.username}</h1>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params!.id);
  const apolloClient = initializeApollo();

  await apolloClient.query<UserQuery>({
    query: UserDocument,
    variables: { id },
  });

  const client = apolloClient.cache.extract();
  const user = client[`User:${id}`];

  client[`Profile:${id}`].updatedAt =
    client[`Profile:${id}`].updatedAt.toString();
  const profile = client[`Profile:${id}`];

  client[`Role:${id}`].updatedAt = client[`Role:${id}`].updatedAt.toString();
  const role = client[`Role:${id}`];

  return {
    props: {
      initialApolloState: { user, profile, role },
    },
  };
};

export default UserDetail;
