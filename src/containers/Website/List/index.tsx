import React from "react";

import { Table, Button, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DownloadOutlined } from "@ant-design/icons";
import { MenuInfo } from "rc-menu/lib/interface";
import moment from "moment";

import { Website } from "@/generated/client";
import DropOption from "@/components/DropOption";
import styles from "./style.module.less";
import router from "next/router";
import Link from "next/link";
import { publishJSON } from "@/utils/publishJSON";
export interface IWebsiteListProps {
  dataSource: Website[];
  onDeleteItem: (id: any) => void;
  onEditItem: (u: Website, a?: string) => void;
  loading: boolean;
}

const { confirm } = Modal;
const nowURL =
  process.env.MODE === "development"
    ? "http://localhost:3000/"
    : "DEPLOYMENT_URL";

const List: React.FC<IWebsiteListProps> = ({
  onEditItem,
  onDeleteItem,
  ...tableProps
}) => {
  const onPublish = (record: Website, e: React.MouseEvent<HTMLElement>) => {
    const pageData = {
      title: "Game Client",
      description: "Game Client",
      fraction: null,
    };
    publishJSON((data) => {
      console.log("JS ZIP DATA", {
        website_id: record.id,
        name: record.name,
        files: [data],
      });
      fetch(`${nowURL}api/next/deploy`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: record.id,
          name: record.name,
          files: [
            {
              file: data.file,
              data: data.data,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then(({ id, error }) => {
          if (error) {
            console.error("Error:", error.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  };
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
      title: `ID`,
      dataIndex: "id",
      width: "3%",
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
      width: "13%",
      render: (text: string, record) => {
        return (
          <>
            <DropOption
              record={record}
              onMenuClick={(e: MenuInfo) => handleMenuClick(record, e)}
              menuOptions={[
                { key: 3, name: "View" },
                { key: 1, name: "Update" },
                { key: 2, name: "Delete" },
              ]}
            />
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                onPublish(record, e)
              }
            >
              Deploy
            </Button>
          </>
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
