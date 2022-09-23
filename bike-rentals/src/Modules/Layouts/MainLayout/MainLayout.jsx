import React from "react";
import { Layout } from "antd";
import { AppBody, AppHeader, AppSideBar } from "../";

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
    <AppHeader />
    <Layout>
      <AppSideBar />
      <Layout
        style={{
          padding: "0 24px 24px",
          marginTop: 40
        }}
      >
        <AppBody>{children}</AppBody>
      </Layout>
    </Layout>
  </Layout>
  );
}

export default MainLayout;
