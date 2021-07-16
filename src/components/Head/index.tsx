import React from "react";
import Head from "next/head";
import METADATA from "src/constants/metadata";

import Meta from "./Meta";

interface IProps {
  title: string;
}

const HeadShare: React.FC<IProps> = ({ title }) => {
  return (
    <Head>
      <title>{(title ? title + " | " : "") + METADATA.APP_NAME}</title>
      <Meta />
    </Head>
  );
};

export default HeadShare;
