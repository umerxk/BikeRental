import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PAGE_ROUTES } from "../../Constants/pageRoutes";
import {
  AdminActions
} from "../../Constants/common";
import { USER_ROLES } from "../../Constants/config";
import { GlobalContext } from "../../Context/GlobalState";

const AppSideBar = () => {
  const { Sider } = Layout;
  const { pathname } = useLocation();
  const { user, setSideBarAction } = useContext(GlobalContext);
  const [selected, setSelected] = useState(AdminActions[1].action);

  const handleClick = (action) => {
    setSelected(action);
    setSideBarAction(action)
  };

  const items2 = AdminActions.map((item) => {
    return {
      label: <div onClick={() => handleClick(item.action)}>{item.label}</div>,
      icon: React.createElement(item.icon),
      key: item.action,
    };
  });

  const CustomMenu = () => {
    if (
      (pathname == PAGE_ROUTES.ADMIN && user?.role === USER_ROLES.MANAGER)
    ) {
      return (
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            selectedKeys={selected}
          />
        </Sider>
      );
    }
  };

  return (
      <CustomMenu />
  );
};
export default AppSideBar;
