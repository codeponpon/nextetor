import React from "react";

import { Layout } from "antd";

import classes from "./style.module.less";

interface IProps {
  children: React.ReactNode;
  style: {};
}

const Header: React.FC<IProps> = ({ children, style }: IProps) => {
  return (
    <div className={classes.headerWrapper}>
      <Layout.Header className={classes.header} style={style}>
        {children}
      </Layout.Header>
    </div>
  );
};

export default Header;
