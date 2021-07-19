import React from "react";
import Home from "@/containers/Home";
import Head from "@/components/Head";
import AppLayout from "@/components/Layout/AppLayout";

const HomePage: React.FC = (props) => {
  console.log("INDEX PAGE");
  return (
    <AppLayout alwaysDarkMode>
      <Head title="" />
      <Home />
    </AppLayout>
  );
};

export default HomePage;
