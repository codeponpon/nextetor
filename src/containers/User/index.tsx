import React, { useState } from "react";
import {
  RolesDocument,
  User,
  useRolesQuery,
  UsersDocument,
  UsersQuery,
} from "@/generated/client";
import { useQuery } from "@apollo/client";
import { IUserProps, List } from "./List";
import { IModalProps, UserModal } from "./Modal";

const UserContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(UsersDocument);
  const users = data?.users;

  const listProps: IUserProps = {
    list: users,
    onEditItem: (item) => {
      console.log("EDIT ITEM :", item);
      setCurrentItem(item);
      setModalVisible(true);
      setModalType("update");
    },
    onDeleteItem: (id) => {
      console.log("DELETE ITEM ID: ", id);
    },
  };

  const listModal: IModalProps = {
    item: modalType === "create" ? {} : currentItem,
    visible: modalVisible || false,
    destroyOnClose: true,
    maskClosable: false,
    confirmLoading: loading,
    title: `${modalType === "create" ? `Create User` : `Update User`}`,
    centered: true,
    onOk: (data: any) => {
      // handleRefresh()
      console.log("On OK : ", data);
      setLoading(true);
    },
    onCancel() {
      setModalVisible(false);
    },
  };

  return (
    <>
      <List {...listProps} />
      <UserModal {...listModal} />
    </>
  );
};

export default UserContainer;
