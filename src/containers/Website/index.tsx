import Page from "@/components/Page";
import { WebsitesDocument } from "@/generated/client";
import { useQuery } from "@apollo/client";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { stringify } from "query-string";
import React from "react";
import { useState } from "react";
import List from "./List";

const { TabPane } = Tabs;

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
};

export const WebsitePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: list, loading: websiteLoading } = useQuery(WebsitesDocument);

  const handleTabClick = (
    key: string,
    e: React.KeyboardEvent | React.MouseEvent
  ) => {
    const { pathname } = router;

    router.push({
      pathname,
      search: stringify({
        status: key,
      }),
    });
  };

  const { query, pathname } = router;

  const listProps = {
    dataSource: list,
    loading: loading,
    onChange() {
      console.log("On Change");
    },
  };

  return (
    <Page>
      <Tabs
        activeKey={
          query.status === String(EnumPostStatus.UNPUBLISH)
            ? String(EnumPostStatus.UNPUBLISH)
            : String(EnumPostStatus.PUBLISHED)
        }
        onTabClick={handleTabClick}
      >
        <TabPane tab={`Publised`} key={String(EnumPostStatus.PUBLISHED)}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab={`Unpublished`} key={String(EnumPostStatus.UNPUBLISH)}>
          {/* <List {...listProps} /> */}
          <h1>Unpublished</h1>
        </TabPane>
      </Tabs>
    </Page>
  );
};
