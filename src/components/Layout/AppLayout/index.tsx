import React, { useEffect, useState } from "react";

import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

import { Layout, BackTop, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import classes from "./style.module.less";

import Head from "@/components/Head";
import Sidebar from "src/components/Layout/Sidebar";
import Header from "src/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AvatarDropDown from "@/components/AvatarDropDown";
import Notifications from "@/components/Notifications";
import router from "next/router";
import website from "@/pages/admin/website";
import { capitalize } from "lodash";

export interface IProps {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);
  // The following effect will be ignored on server,
  // but run on the browser to set the flag true
  useEffect(() => setIsClient(true), []);
  return isClient;
}

const { Content, Sider } = Layout;

const AppLayout: React.FC<IProps> = ({
  children,
  title,
  alwaysDarkMode,
}: IProps) => {
  const isClient = useIsClient();
  const [collapsed, setCollapsed] = useState(false);
  const [mobiShow, setMobiShow] = useState(false);
  const [broken, setBroken] = useState(false);
  const theme = alwaysDarkMode ? "dark" : "light";
  const [rootPath, adminPath, currentPath, id] = router.route.split("/");
  const handleToggle = () => {
    if (broken) {
      setMobiShow(!mobiShow);
    } else {
      setCollapsed(!collapsed);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setMobiShow(false);
    };

    Router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head title="" />
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className={classes.root}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed && !broken}
          className={classes.sidebar}
          breakpoint="lg"
          onBreakpoint={(val) => {
            setBroken(val);
            if (val) {
              setCollapsed(false);
              setMobiShow(false);
            }
          }}
          style={{
            left: broken && !mobiShow ? -200 : 0,
          }}
          theme={theme}
        >
          <Link href="/">
            <a>
              <div className={classes.logo}>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={35}
                  height={35}
                />
                {!collapsed && <span>Nextetor</span>}
              </div>
            </a>
          </Link>
          {isClient && <Sidebar theme={theme} />}
        </Sider>
        <Layout
          className={classes.siteLayout}
          style={{
            paddingLeft: broken ? 0 : collapsed ? 50 : 200,
          }}
        >
          {mobiShow && broken && (
            <div
              className={classes.overlay}
              onClick={() => setMobiShow(false)}
            />
          )}
          <Header
            style={{
              left: broken ? 0 : collapsed ? 50 : 200,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: classes.trigger,
                onClick: handleToggle,
              }
            )}
            {broken && (
              <Link href="/">
                <a>
                  <div className={classes.logoCenter}>
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={35}
                      height={35}
                    />
                    <span>Nextetor</span>
                  </div>
                </a>
              </Link>
            )}
            <div className={classes.headerRight}>
              <Notifications />
              <AvatarDropDown />
            </div>
          </Header>
          {mobiShow && broken && (
            <div
              className={classes.overlay}
              onClick={() => setMobiShow(false)}
            />
          )}
          <Breadcrumb className="p-3">
            <Breadcrumb.Item>
              <Link href="/">
                <a>
                  <DashboardOutlined /> Dashboard
                </a>
              </Link>
            </Breadcrumb.Item>
            {router.query.id && (
              <Breadcrumb.Item>
                <Link href="/admin/website">
                  <a>{capitalize(currentPath)}</a>
                </Link>
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              margin: 20,
            }}
          >
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
      <BackTop />
    </>
  );
};

export default AppLayout;
