import React from "react";

import AppLayout from "@/components/Layout/AppLayout";
import Head from "@/components/Head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Page from "@/components/Page";

const UserDetail = ({
      initialApolloState,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppLayout alwaysDarkMode title="Setting">
      <Head title="Setting" />
      <Page inner>
        <h1>Setting</h1>
      </Page>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      initialApolloState: {},
    },
  };
};

export default UserDetail;
