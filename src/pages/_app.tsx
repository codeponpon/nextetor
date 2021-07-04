import React, { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import useAsync from "react-use/lib/useAsync";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";

import wrapperStore from "@/redux";
import { useApollo } from "@/utils/client";
import AuthStorage from "@/utils/auth-storage";
import Loading from "@/components/Loading";
require("src/styles/index.less");

const urlsIgnore = ["/forgot-password", "/login", "/reset-password"];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [awaitLoading, setAwaitLoading] = useState(true);
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        NProgress.start();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    // If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", () => NProgress.done());
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, []);

  useAsync(async () => {
    if (AuthStorage.loggedIn) {
      try {
        router.push("/");
      } catch (error) {
        if (
          (error.status === 403 || error.status === 401) &&
          error.code !== "AUTHORIZATION_REQUIRED"
        ) {
          AuthStorage.destroy();
          dispatch({ type: "LOGOUT_SUCCESS" });

          if (router.pathname !== "/login") {
            router.push("/login");
          }
        }
      }

      setTimeout(() => setAwaitLoading(false), 500);
    } else {
      setTimeout(() => setAwaitLoading(false), 600);
    }
  }, [AuthStorage.loggedIn]);

  useAsync(async () => {
    if (
      !AuthStorage.loggedIn &&
      typeof window !== "undefined" &&
      !urlsIgnore.includes(router.pathname)
    ) {
      router.push("/login");
    }
  }, [router.pathname]);

  if (awaitLoading) {
    return (
      <div className="text-center">
        <Loading fullScreen />
      </div>
    );
  }

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
