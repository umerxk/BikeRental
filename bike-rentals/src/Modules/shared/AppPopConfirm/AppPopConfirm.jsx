import { Popconfirm } from "antd";
import React from "react";

const AppPopConfirm = ({ children, confirm, text = "" }) => (
  <Popconfirm
    placement="bottom"
    title={text}
    onConfirm={confirm}
    okText="Yes"
    cancelText="No"
  >
    {children}
  </Popconfirm>
);

export default AppPopConfirm;
