import React, { useState } from "react";
import {
  CreatedBy,
  CreateUserDocument,
  DeleteUserDocument,
  UpdateUserDocument,
  UsersDocument,
} from "@/generated/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
  const [createUser] = useMutation(CreateUserDocument);
  const [updateUser] = useMutation(UpdateUserDocument);
  const [deleteUser] = useMutation(DeleteUserDocument);
  const [getUsers, { data, loading: getUserLoading }] =
    useLazyQuery(UsersDocument);
  const {
    data: userList,
    loading: queryUserLoading,
    refetch,
  } = useQuery(UsersDocument);
  const users = data?.users ? data?.users : userList?.users;

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
    item:
      modalType === "create"
        ? {
            username: "",
            password: "",
            roleId: 4,
            createdBy: CreatedBy.Admin,
            profile: { lineID: "", mobile: "" },
          }
        : currentItem,
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
    onOk: async (userInput) => {
      console.log("---- On OK ----");
      setLoading(true);
      const { profile, birthday, confirm, ...userData } = userInput;
      if (birthday) profile.birthday = birthday;
      try {
        if (modalType === "create") {
          const { data } = await createUser({
            variables: { input: { ...userData, profile: { ...profile } } },
          });
          if (data.createUser !== null) refetch();
        } else {
          userData.updatedAt = dayjs(userData.updatedAt).format();
          const { data } = await updateUser({
            variables: { input: { ...userData, profile: { ...profile } } },
          });
          if (data.updateUser !== null) refetch();
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

  const { query } = router;
  const filterProps: iFilterProps = {
    filter: {
      ...query,
    },
    onFilterChange: (filter: {
      name?: string;
      createTime?: moment.Moment[] | string[];
    }) => {
      setLoading(true);
      if (filter.createTime?.length) {
        getUsers({
          variables: {
            query: filter.name,
            begin: filter.createTime[0],
            end: filter.createTime[1],
          },
        });
      } else {
        getUsers({ variables: { query: filter.name } });
      }
      setLoading(false);
    },
    onAdd() {
      setModalVisible(true);
      setModalType("create");
    },
  };

  return (
    <Page inner loading={loading || getUserLoading || queryUserLoading}>
      <Filter {...filterProps} />
      <List {...listProps} />
      <UserModal {...listModal} />
    </Page>
  );
};

export default UserContainer;
