import Head from "next/head";
import type { AppProps, AppContext } from "next/app";
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
