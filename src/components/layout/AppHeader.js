import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import { Layout } from "antd";
import ARMButton from "../common/buttons/ARMButton";

export default function AppHeader({ collapsed, setCollapsed }) {

    /*const handleLogOut = async () => {
      try {
        await UsersService.logOut();
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(""));
        navigate("/login");
      } catch (e) {
        notification["error"]({
          message: getErrorMessage(e),
        });
      }
    };*/

  return (
    <Layout.Header
      className="site-layout-background"
      style={{
        color: "#ffffff",
        backgroundColor: "#2C3E50",
        fontSize: "20px",
        position: "sticky",
        top: 0,
        zIndex: 9999999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      <ARMButton size="middle" type="primary" danger>
          <i className="fa fa-sign-out" aria-hidden="true" title="Sign out"/>
      </ARMButton>
    </Layout.Header>
  );
}
