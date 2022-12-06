import Sidebar from "./Sidebar";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import React from "react";
import { useAppContext } from "../../contexts/apps";
const { Content } = Layout;

export default function CommonLayout({ children }) {
  const { logo, collapsed, setCollapsed } = useAppContext();

  return (
    <Layout style={{ minHeight: "100vh", marginLeft: collapsed ? 80 : 200, transition: '.4s'}}>
      <Sidebar
        collapsed={collapsed}
        logo={logo}
      />
      <Layout className="site-layout">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "1em",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
