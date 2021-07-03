import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import wrapperStore from "@/redux";
import { useApollo } from "@/utils/client";
import { ApolloProvider } from "@apollo/client";
require("src/styles/index.less");

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default wrapperStore.withRedux(MyApp);
