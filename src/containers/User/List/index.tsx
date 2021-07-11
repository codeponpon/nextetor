import React from "react";

import Link from "next/link";
import { Table, Modal, Avatar } from "antd";
import { ColumnsType } from "antd/lib/table";
import { MenuInfo } from "rc-menu/lib/interface";

import { User } from "@/generated/client";
import DropOption from "@/components/DropOption";
import styles from "./list.module.less";
import dayjs from "dayjs";

export interface IUserProps {
  list: User[];
  onDeleteItem: (id: any) => void;
  onEditItem: (u: User) => void;
  // loading: boolean;
  // rowSelection: object;
  // onChange?: (pagination: any, filters: any, sorter: any) => void;
  // location?: object;
  // pagination?: TablePaginationConfig;
}

const { confirm } = Modal;

export const List: React.FC<IUserProps> = (props) => {
  const { list, onEditItem, onDeleteItem } = props;
  const handleMenuClick = (record: User, e: MenuInfo) => {
    if (e.key === "1") {
      onEditItem(record);
    } else if (e.key === "2") {
      confirm({
        title: "Are you sure delete this record?",
        onOk() {
          onDeleteItem(record.id);
        },
      });
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "5%",
      fixed: "left",
      render: (text: string) => (
        <Avatar
          style={{ marginLeft: 8 }}
          src={`https://i.pravatar.cc/150?img=37`}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "15%",
      render: (text: string, record: User) => (
        <Link href={`users/[id]`} as={`users/${record.id}`} shallow={true}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: User) => record.profile?.firstName,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      render: (text: string, record: User) => record.profile?.mobile,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      render: (text: string, record: User) => record.profile?.email,
    },
    {
      title: "CreateTime",
      dataIndex: "createTime",
      key: "createdAt",
      width: "15%",
      render: (text: string, record: User) =>
        dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Operation",
      key: "operation",
      fixed: "right",
      width: "8%",
      render: (text: string, record: User) => {
        return (
          <DropOption
            record={record}
            onMenuClick={(e: MenuInfo) => handleMenuClick(record, e)}
            menuOptions={[
              { key: 1, name: "Update" },
              { key: 2, name: "Delete" },
            ]}
          />
        );
      },
    },
  ];

  return (
    <Table<User>
      dataSource={list}
      pagination={{
        pageSize: 10,
        showTotal: (total) => `Total ${total} Items`,
      }}
      className={styles.table}
      bordered
      scroll={{ x: 1200 }}
      columns={columns}
      rowKey="id"
    />
  );
};
