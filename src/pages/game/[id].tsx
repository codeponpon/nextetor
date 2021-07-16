import React from "react";

import { AuthProvider } from "@/containers/Game/Auth";
import Head from "@/components/Head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GameContent } from "@/containers/Game/Content";
import GameLayout from "@/containers/Game/Layout";
import styles from "@/containers/Game/styles/index.module.less";

const GamePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

export default GamePage;
