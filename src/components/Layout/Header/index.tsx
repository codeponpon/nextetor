import React from "react";

import { Layout } from "antd";

import classes from "./style.module.less";

interface IProps {
  children: React.ReactNode;
  style: any;
}

const Header: React.FC<IProps> = ({ children, style }) => {
  return (
    <div className={classes.headerWrapper}>
      <Layout.Header className={classes.header} style={style}>
        {children}
      </Layout.Header>
    </div>
  );
};

export default Header;
