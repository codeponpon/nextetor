import React, { PureComponent } from "react";
import { Table, Avatar } from "antd";
import styles from "./style.module.less";

interface IWebsiteListProps {}

const List: React.FC<IWebsiteListProps> = ({ ...tableProps }) => {
  const columns = [
    {
      title: `Image`,
      dataIndex: "image",
      render: (text: string) => (
        <Avatar shape="square" src={`https://i.pravatar.cc/150?img=37`} />
      ),
    },
    {
      title: `Name`,
      dataIndex: "name",
      render: (text: string) => ({ text }),
    },
    {
      title: `Author`,
      dataIndex: "author",
    },
    {
      title: `Visibility`,
      dataIndex: "visibility",
    },
    {
      title: `Publish Date`,
      dataIndex: "date",
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
