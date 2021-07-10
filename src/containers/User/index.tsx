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

const UserContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState({ id: 0 });
  const [loading, setLoading] = useState(false);

  const [updateUser] = useMutation(UpdateUserDocument);
  const [deleteUser] = useMutation(DeleteUserDocument);
  const { data, refetch: refetchUsers } = useQuery(UsersDocument);
  const users = data?.users;

  const listProps: IUserProps = {
    list: users,
    onEditItem: (item) => {
      setCurrentItem(item);
      setModalVisible(true);
      setModalType("update");
    },
    onDeleteItem: async (id: number) => {
      console.log("DELETE ITEM ID: ", id);
      const { data } = await deleteUser({ variables: { id: id } });
      if (data.deleteUser !== null) refetchUsers();
    },
  };

  const listModal: IModalProps = {
    item: modalType === "create" ? { id: 0 } : currentItem,
    visible: modalVisible || false,
    destroyOnClose: true,
    maskClosable: false,
    confirmLoading: loading,
    title: `${modalType === "create" ? `Create User` : `Update User`}`,
    centered: true,
    onOk: async (updateUserInput: any) => {
      // handleRefresh()
      console.log("---- On OK ----");
      setLoading(true);
      const { profile, birthday, ...userData } = updateUserInput;
      try {
        profile.birthday = birthday;
        userData.updatedAt = dayjs(userData.updatedAt).format();
        const { data } = await updateUser({
          variables: { input: { ...userData, profile: { ...profile } } },
        });
        if (data.updateUser !== null) refetchUsers();
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
    <>
      <List {...listProps} />
      <UserModal {...listModal} />
    </>
  );
};

export default UserContainer;
