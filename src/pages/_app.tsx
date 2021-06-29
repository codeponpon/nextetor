import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import AppLayout from "@/components/Layout/AppLayout";
require("src/styles/index.less");

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
