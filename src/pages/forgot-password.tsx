import React from "react";

import Head from "src/components/Head";
import ForgotPassword from "src/containers/Auth/ForgotPassword/";

const ForgotPasswordPage: React.FC = (props) => {
  return (
    <>
      <Head title="Forgot Password" />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
