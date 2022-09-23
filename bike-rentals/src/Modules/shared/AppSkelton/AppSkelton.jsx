import { Skeleton } from "antd";
import React from "react";

const AppSkelton = () => (
  <Skeleton
    avatar
    paragraph={{
      rows: 4,
    }}
    style={{ marginBottom: 20 }}
  />
);

export default AppSkelton;
