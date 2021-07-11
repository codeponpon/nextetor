import React, { useState } from "react";
import {
  DeleteUserDocument,
  UpdateUserDocument,
  UsersDocument,
} from "@/generated/client";
import { useMutation, useQuery } from "@apollo/client";
import { IUserProps, List } from "./List";
import { IModalProps, UserModal } from "./Modal";
import { useDispatch } from "react-redux";
import { ActionType } from "@/redux/actions/types";
import dayjs from "dayjs";
import Filter, { iFilterProps } from "@/containers/User/Filter";
import { useRouter } from "next/router";
import Page from "@/components/Page";

const UserContainer: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState({ id: 0 });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const [updateUser] = useMutation(UpdateUserDocument);
  const [deleteUser] = useMutation(DeleteUserDocument);
  const { data, refetch } = useQuery(UsersDocument);
  const users = data?.users;

  const listProps: IUserProps = {
    list: users,
    onEditItem: (item, action = "update") => {
      setCurrentItem(item);
      setModalVisible(true);
      setModalType(action);
    },
    onDeleteItem: async (id: number) => {
      console.log("DELETE ITEM ID: ", id);
      const { data } = await deleteUser({ variables: { id: id } });
      if (data.deleteUser !== null) refetch();
    },
  };

  const listModal: IModalProps = {
    action: modalType,
    item: modalType === "create" ? { id: 0 } : currentItem,
    visible: modalVisible || false,
    destroyOnClose: true,
    maskClosable: false,
    confirmLoading: loading,
    title: `${
      modalType === "create"
        ? `Create User`
        : modalType === "update"
        ? `Update User`
        : "Detail"
    }`,
    centered: true,
    onOk: async (updateUserInput: any) => {
      console.log("---- On OK ----");
      setLoading(true);
      const { profile, birthday, ...userData } = updateUserInput;
      try {
        profile.birthday = birthday;
        userData.updatedAt = dayjs(userData.updatedAt).format();
        const { data } = await updateUser({
          variables: { input: { ...userData, profile: { ...profile } } },
        });
        console.log(data);
        if (data.updateUser !== null) refetch();
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

  const { query } = router;
  const filterProps: iFilterProps = {
    filter: {
      ...query,
    },
    onFilterChange: (value: {
      name?: string;
      createTime?: moment.Moment[] | string[];
    }) => {
      console.log("On Filter Change");
    },
    onAdd() {
      setModalVisible(true);
      setModalType("create");
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      <UserModal {...listModal} />
    </Page>
  );
};

export default UserContainer;
