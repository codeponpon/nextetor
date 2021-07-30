import React from "react";
import { Result } from "antd";

const Custom500: React.FC = (props) => {
  return (
    <Result status="500" title="500" subTitle="Sorry, something went wrong." />
  );
};

export default Custom500;
