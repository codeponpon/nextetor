import Page from "@/components/Page";
import {
  ConfigStatus,
  CreateWebsiteDocument,
  DeleteWebsiteDocument,
  UpdateWebsiteDocument,
  WebsitesDocument,
} from "@/generated/client";
import { ActionType } from "@/redux/actions/types";
import AuthStorage from "@/utils/auth-storage";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Tabs, Button } from "antd";
import { useRouter } from "next/router";
import { stringify } from "query-string";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import List, { IWebsiteListProps } from "./List";
import { IWebsiteModalProps, WebsiteModal } from "./Modal";

const { TabPane } = Tabs;

const EnumPostStatus = {
  UNPUBLISH: "DEACTIVATED",
  PUBLISHED: "ACTIVATED",
};

export const WebsitePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [createWebsite] = useMutation(CreateWebsiteDocument);
  const [updateWebsite] = useMutation(UpdateWebsiteDocument);
  const [deleteWebsite] = useMutation(DeleteWebsiteDocument);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState({ userId: 0, name: "" });
  const [loading, setLoading] = useState(false);
  const [getWebsites, { data, loading: getWebsiteLoading }] =
    useLazyQuery(WebsitesDocument);
  const {
    data: websiteList,
    loading: websiteLoading,
    refetch,
  } = useQuery(WebsitesDocument, {
    variables: { status: router.query.status },
  });

  const websites = data?.websites ? data?.websites : websiteList?.websites;

  const handleTabClick = (
    key: String,
    e: React.KeyboardEvent | React.MouseEvent
  ) => {
    setLoading(true);
    const { pathname } = router;

    router.push({
      pathname,
      search: stringify({
        status: key,
      }),
    });

    getWebsites({ variables: { status: key } });
    if (!getWebsiteLoading) setLoading(false);
  };

  const handleCreateWebsite = () => {
    setModalType("create");
    setModalVisible(true);
  };

  const { query, pathname } = router;

  const listProps: IWebsiteListProps = {
    dataSource: websites,
    loading: loading || websiteLoading || getWebsiteLoading,
    onEditItem: (item, action = "update") => {
      setCurrentItem(item);
      setModalVisible(true);
      setModalType(action);
    },
    onDeleteItem: async (id: number) => {
      const { data } = await deleteWebsite({ variables: { id: id } });
      if (data.deleteWebsite !== null) refetch();
    },
  };

  const listModal: IWebsiteModalProps = {
    action: modalType,
    item:
      modalType === "create"
        ? {
            userId: AuthStorage.userId,
            name: "",
            status: ConfigStatus.Deactivated,
          }
        : currentItem,
    visible: modalVisible || false,
    destroyOnClose: true,
    maskClosable: false,
    confirmLoading: loading || websiteLoading || getWebsiteLoading,
    title: `${
      modalType === "create"
        ? `Create Website`
        : modalType === "update"
        ? `Update Website`
        : "Detail"
    }`,
    centered: true,
    onOk: async (websiteInput) => {
      setLoading(true);
      try {
        if (modalType === "create") {
          const { data } = await createWebsite({
            variables: { input: websiteInput },
          });

          if (data.createWebsite !== null) refetch();
        } else {
          const { data } = await updateWebsite({
            variables: { input: websiteInput },
          });
          console.log("Website Data", data.updateWebsite);
          if (data.updateWebsite !== null) refetch();
        }
        setModalVisible(false);
      } catch (error) {
        await dispatch({
          type: ActionType.REQUEST_ERROR,
          payload: error,
        });
      } finally {
        setLoading(false);
      }
    },
    onCancel() {
      setModalVisible(false);
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
        tabBarExtraContent={
          <Button onClick={handleCreateWebsite}>Create Website</Button>
        }
      >
        <TabPane tab={`Publised`} key={String(EnumPostStatus.PUBLISHED)}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab={`Unpublished`} key={String(EnumPostStatus.UNPUBLISH)}>
          <List {...listProps} />
        </TabPane>
      </Tabs>
      <WebsiteModal {...listModal} />
    </Page>
  );
};
