import { Layout, Menu } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PAGE_ROUTES } from "../../Constants/pageRoutes";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { USER_ROLES } from "../../Constants/config";

const AppHeader = () => {
  const location = useLocation();
  const { user, setUser } = useContext(GlobalContext);

  function roleGaurd(currentUserRole){
    return user?.role === currentUserRole
  }

  const handleLogout = () => {
    setUser({});
    localStorage.clear();
    window.location.href = "/";
  };

  const NavText = ({ children, moveTo }) => (
    <Link to={moveTo}>
      <div style={{ marginTop: -5 }}>{children}</div>
    </Link>
  );

  const NavPlaces = [
    {
      label: (
        <NavText moveTo={PAGE_ROUTES.HOME}>
          <ShoppingCartOutlined /> Bike It
        </NavText>
      ),
      path: PAGE_ROUTES.HOME,
      key: PAGE_ROUTES.HOME,
    },
    roleGaurd(USER_ROLES.USER) && {
      label: (
        <NavText moveTo={PAGE_ROUTES.RESERVATIONS}>My Reservations</NavText>
      ),
      path: PAGE_ROUTES.RESERVATIONS,
      key: PAGE_ROUTES.RESERVATIONS,
    },
    roleGaurd(USER_ROLES.MANAGER) && {
      label: <NavText moveTo={PAGE_ROUTES.ADMIN}>Admin</NavText>,
      path: PAGE_ROUTES.ADMIN,
      key: PAGE_ROUTES.ADMIN,
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          label: <Link to={PAGE_ROUTES.ACCOUNT}>Account</Link>,
          key: "0",
        },
        roleGaurd(USER_ROLES.USER) && {
          label: <Link to={PAGE_ROUTES.RESERVATIONS}>Reservations</Link>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <div onClick={handleLogout}>
              Logout <LogoutOutlined style={{ marginLeft: 40 }} />
            </div>
          ),
          key: "3",
        },
      ]}
    />
  );

  const UserSettings = () => (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div style={{ marginTop: -5 }}>
        <Space>
          <UserOutlined />
          {user?.name}
          <DownOutlined />
        </Space>
      </div>
    </Dropdown>
  );

  const { Header } = Layout;
  return (
    <Header
      style={{ height: 50, position: "fixed", width: "100%", zIndex: 1 }}
      className="header"
    >
      <Menu
        theme="dark"
        mode="horizontal"
        items={NavPlaces}
        selectedKeys={[location.pathname]}
        style={{ width: "100%", height: 50 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 100,
          color: "white",
          cursor: "pointer",
        }}
      >
        {user?.name ? (
          <UserSettings />
        ) : (
          <Link to={PAGE_ROUTES.LOGIN}>Login</Link>
        )}
      </div>
    </Header>
  );
};
export default AppHeader;
