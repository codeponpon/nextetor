import React, { useEffect } from "react";

import { useRouter } from "next/router";

import { Menu, MenuTheme } from "antd";
import { DashboardOutlined } from "@ant-design/icons";

const Sidebar = ({ theme }: { theme: MenuTheme }) => {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const [root, sub] = router.pathname?.split("/");

  return (
    <Menu
      defaultSelectedKeys={["/"]}
      selectedKeys={["/" + (sub && sub !== "[id]" ? sub : root)]}
      defaultOpenKeys={["/" + root]}
      mode="inline"
      theme={theme}
      style={{
        padding: "15px 0",
      }}
    >
      <Menu.Item
        key="/"
        onClick={() => router.push("/")}
        icon={<DashboardOutlined />}
      >
        <span>Dashboard</span>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
