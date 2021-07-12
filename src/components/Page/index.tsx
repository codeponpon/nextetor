import React, { Component } from "react";
import classnames from "classnames";
import Loader from "@/components/Loader";
import styles from "./style.module.less";

interface IPageProps {
  children: React.ReactNode;
  inner?: boolean;
  className?: string;
  loading?: boolean;
}

const Page: React.FC<IPageProps> = ({
  className,
  children,
  loading = false,
  inner = false,
}) => {
  const loadingStyle: React.CSSProperties = {
    height: "calc(100vh - 184px)",
    overflow: "hidden",
  };
  return (
    <div
      className={classnames(className, {
        [styles.contentInner]: inner,
      })}
      style={loading ? loadingStyle : {}}
    >
      {loading ? <Loader spinning /> : ""}
      {children}
    </div>
  );
};

export default Page;
