import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
const { confirm } = Modal;

export const showConfirm = (title, content, handleResponse) => {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,

    onOk() {
      handleResponse(true);
    },

    onCancel() {
      handleResponse(false);
    },
  });
};

export const showDeleteConfirm = (title, content, handleResponse) => {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",

    onOk() {
      handleResponse(true);
    },

    onCancel() {
      handleResponse(false);
    },
  });
};
