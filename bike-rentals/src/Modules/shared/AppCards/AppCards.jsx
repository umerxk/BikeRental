import { Card, Row } from "antd";
import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CheckSquareOutlined,
  StopOutlined,
} from "@ant-design/icons";
import AppRate from "../AppRate";

import BikeIcon from "../icons/BikeIcon";
import { USER_ROLES } from "../../Constants/config";

const AppCards = ({
  title = "",
  description = "",
  color = "black",
  handleAction,
  userRole,
  handleReview,
  reviewValue,
  disableReview,
  newView,
  actionText,
  actionIcon,
  isReserved = null,
}) => (
  <Card
    style={{
      marginTop: 16,
      width: newView ? "30%" : "100%",
      marginLeft: newView ? "3%" : 0,
    }}
    cover={<BikeIcon color={color} />}
    extra={
      <AppRate
        handleChange={handleReview}
        color={color}
        value={reviewValue}
        disableReview={disableReview}
      />
    }
    actions={
      userRole === USER_ROLES.MANAGER
        ? [
            <EditOutlined key="edit" onClick={() => handleAction("edit")} />,
            <DeleteOutlined key="del" onClick={() => handleAction("del")} />,
          ]
        : [
            <Row align="center" onClick={() => handleAction(actionText)}>
              <p>{actionText}</p>
              <div style={{ marginTop: 2, marginLeft: 10 }}>{actionIcon}</div>
            </Row>,
            // isReserved !== null ? (
            //   !isReserved ? (
            //     <div style={{ cursor: 'default' }}>
            //       <CheckSquareOutlined /> Available{" "}
            //     </div>
            //   ) : (
            //     <div style={{ cursor: 'default' }}>
            //       <StopOutlined /> Booked
            //     </div>
            //   )
            // ) : null,
          ]
    }
    type="inner"
    title={title}
  >
    {description}
  </Card>
);

export default AppCards;
