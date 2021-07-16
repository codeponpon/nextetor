import React from "react";

import { LoadingOutlined } from "@ant-design/icons";

import THEME from "src/constants/theme";

interface IProps {
  fullScreen: boolean;
}

const defaultProps: IProps = {
  fullScreen: false,
};

const Loading: React.FC<IProps> = ({ fullScreen = defaultProps }) => {
  if (!fullScreen) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: 99,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingOutlined
          style={{ fontSize: 40, color: THEME["@primary-color"] }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingOutlined
        style={{ fontSize: 40, color: THEME["@primary-color"] }}
      />
    </div>
  );
};

export default Loading;
