import React from "react";

import AppLayout from "@/components/Layout/AppLayout";
import Head from "@/components/Head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Page from "@/components/Page";
import { WebsitePage } from "@/containers/Website";

const UserDetail = ({
  initialApolloState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppLayout alwaysDarkMode title="Website">
      <Head title="Website" />
      <Page inner>
        <WebsitePage />
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
