import React from "react";

import { Table, Avatar, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { MenuInfo } from "rc-menu/lib/interface";
import moment from "moment";

import { Website } from "@/generated/client";
import DropOption from "@/components/DropOption";
import styles from "./style.module.less";
import router from "next/router";
import Link from "next/link";

export interface IWebsiteListProps {
  dataSource: Website[];
  onDeleteItem: (id: any) => void;
  onEditItem: (u: Website, a?: string) => void;
  loading: boolean;
}

const { confirm } = Modal;

const List: React.FC<IWebsiteListProps> = ({
  onEditItem,
  onDeleteItem,
  ...tableProps
}) => {
  const handleMenuClick = (record: Website, e: MenuInfo) => {
    if (e.key === "1") {
      onEditItem(record);
    } else if (e.key === "2") {
      confirm({
        title: "Are you sure delete this record?",
        onOk() {
          onDeleteItem(record.id);
        },
      });
    } else {
      router.push(`/admin/website/${record.id}`);
    }
  };

  const columns: ColumnsType<Website> = [
    {
      title: `Image`,
      dataIndex: "image",
      render: (text: string) => (
        <Avatar shape="square" src={`https://i.pravatar.cc/150?img=37`} />
      ),
      width: "5%",
    },
    {
      title: `Website Name`,
      dataIndex: "name",
      width: "10%",
      render: (text: string, record: Website) => {
        return (
          <Link href="website/[id]" as={`website/${record.id}`}>
            <a>{text}</a>
          </Link>
        );
      },
    },
    {
      title: `Author`,
      dataIndex: "username",
      width: "10%",
      render: (text: string, record: Website) => {
        return record && record.user ? record.user.username : text;
      },
    },
    {
      title: `Domain`,
      dataIndex: "domain",
      width: "15%",
    },
    {
      title: `Sub Domain`,
      dataIndex: "subdomain",
      width: "15%",
    },
    {
      title: `Status`,
      dataIndex: "status",
      width: "10%",
    },
    {
      title: `Last Update`,
      dataIndex: "updatedAt",
      width: "12%",
      render: (text: string) => moment(text).format("YYYY-MM-DD H:m:s"),
    },
    {
      title: `Created Date`,
      dataIndex: "createdAt",
      width: "12%",
      render: (text: string) => moment(text).format("YYYY-MM-DD H:m:s"),
    },
    {
      title: "Operation",
      key: "operation",
      fixed: "right",
      width: "8%",
      render: (text: string, record) => {
        return (
          <DropOption
            record={record}
            onMenuClick={(e: MenuInfo) => handleMenuClick(record, e)}
            menuOptions={[
              { key: 3, name: "View" },
              { key: 1, name: "Update" },
              { key: 2, name: "Delete" },
            ]}
          />
        );
      },
    },
  ];

  return (
    <Table
      {...tableProps}
      pagination={{
        pageSize: 10,
        showTotal: (total) => `Total ${total} Items`,
      }}
      bordered
      scroll={{ x: 1200 }}
      className={styles.table}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
};

export default List;
