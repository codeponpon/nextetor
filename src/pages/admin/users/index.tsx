import React from "react";

import AppLayout from "@/components/Layout/AppLayout";
import Head from "@/components/Head";
import User from "@/containers/User";

const UsersPage: React.FC = (props) => {
  return (
    <AppLayout alwaysDarkMode title="Users">
      <Head title="Users" />
      <User />
    </AppLayout>
  );
};

export default UsersPage;
