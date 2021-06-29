import React from "react";
import PropTypes from "prop-types";
import { Layout, BackTop } from "antd";

const propTypes = {
  children: PropTypes.any,
};

const defaultProps = {
  children: null,
};

const AppLayout = () => {
  return (
    <div>
      <h1>App Layout</h1>
    </div>
  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;
export default AppLayout;
