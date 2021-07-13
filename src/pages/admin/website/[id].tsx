import React from "react";

import AppLayout from "@/components/Layout/AppLayout";
import Head from "@/components/Head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Page from "@/components/Page";
import { initializeApollo } from "@/utils/client";
import { WebsitesDocument, WebsitesQuery } from "@/generated/client";
import { useRouter } from "next/router";
import { WebsitePage } from "@/containers/Website";
import { WebsiteDetail } from "@/containers/Website/Detail";

type WebsiteProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Websites = ({ websites, fetching }: WebsiteProps) => {
  const router = useRouter();
  let title = router.query.id ? websites[0].name : "Websites";
  const renderPage = router.query.id ? (
    <WebsiteDetail loading={fetching} websites={websites} />
  ) : (
    <WebsitePage loading={fetching} websites={websites} />
  );

  return (
    <AppLayout alwaysDarkMode title={title}>
      <Head title="Website" />
      <Page loading={fetching} inner={!!!router.query.id}>
        {renderPage}
      </Page>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const apolloClient = initializeApollo({});

  let websites;
  let fetching = false;
  if (params?.id) {
    const { data, loading } = await apolloClient.query<WebsitesQuery>({
      query: WebsitesDocument,
      variables: { id: Number(params?.id) },
    });
    websites = websites = JSON.parse(JSON.stringify(data?.websites));
    fetching = loading;
  } else {
    const { data, loading } = await apolloClient.query<WebsitesQuery>({
      query: WebsitesDocument,
      variables: { status: query.status },
    });
    websites = JSON.parse(JSON.stringify(data?.websites));
    fetching = loading;
  }

  return { props: { websites, fetching } };
};

export default Websites;
