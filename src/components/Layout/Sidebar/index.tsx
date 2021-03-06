import React from "react";

import { useRouter } from "next/router";

import { Menu, MenuTheme } from "antd";
import {
  ControlOutlined,
  DashboardOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ConfigStatus } from "@/generated/client";

const Sidebar: React.FC<{ theme: MenuTheme }> = ({ theme }) => {
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
      <Menu.Item
        key="/admin/users"
        onClick={() => router.push("/admin/users")}
        icon={<TeamOutlined />}
      >
        <span>Users</span>
      </Menu.Item>
      <Menu.Item
        key="/admin/website"
        onClick={() =>
          router.push({
            pathname: "/admin/website",
            query: { status: ConfigStatus.Activated },
          })
        }
        icon={<GlobalOutlined />}
      >
        <span>Website</span>
      </Menu.Item>
      <Menu.Item
        style={{ display: "none" }}
        key="/admin/setting"
        onClick={() => router.push("/admin/setting")}
        icon={<ControlOutlined />}
      >
        <span>Setting</span>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
