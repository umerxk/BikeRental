import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from "react";

const AppToast = ({ title, description }) =>
  notification.open({
    message: title,
    description,
    icon: (
      <SmileOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });

export default AppToast;
