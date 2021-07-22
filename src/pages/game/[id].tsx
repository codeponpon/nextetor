import React from "react";

import { Result } from "antd";

import { AuthProvider } from "@/containers/Game/Auth";
import Head from "@/components/Head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GameContent } from "@/containers/Game/Content";
import GameLayout from "@/containers/Game/Layout";
import styles from "@/containers/Game/styles/index.module.less";
import { initializeApollo } from "@/utils/client";
import { WebsiteDocument, WebsiteQuery } from "@/generated/client";

type WebsiteProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const GamePage = ({ website }: WebsiteProps) => {
  if (!website) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        // extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
  const title = "Websites";
  return (
    <AuthProvider authenticated={false}>
      <Head title={title} />
      <GameLayout styles={styles}>
        <GameContent />
      </GameLayout>
    </AuthProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo({});

  let website = {};
  let fetching = false;
  if (params?.id) {
    const { data, loading } = await apolloClient.query<WebsiteQuery>({
      query: WebsiteDocument,
      variables: { id: Number(params.id) },
    });
    website = JSON.parse(JSON.stringify(data?.website));
    fetching = loading;
  }

  return { props: { website, fetching } };
};

export default GamePage;
