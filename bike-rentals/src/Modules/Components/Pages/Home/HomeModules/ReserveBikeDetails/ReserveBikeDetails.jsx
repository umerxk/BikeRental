import {useState} from 'react';
import { Descriptions } from "antd";
import { AppModal, AppRate } from "../../../../../shared";
import { getFormatedDate, getValidDataFromUrl } from "../../../../../Utils";
import { useLocation } from "react-router-dom";

import {
  InfoCircleOutlined,
  UserOutlined,
  MailOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const ReserveBikeDetails = ({
  reserveBikeModal,
  handleCloseModal,
  currentUser,
  dates,
  bikeForBooking,
  handleSubmit,
  okText,
  showRating=false,
}) => {
  const { search } = useLocation();
  const [bikeRating, setBikeRating] = useState(bikeForBooking.reservationRating);

  return (
    <AppModal
      openModal={reserveBikeModal}
      closeModal={handleCloseModal}
      defautlFooter={true}
      okText={okText}
      handleSubmit={() => handleSubmit(showRating ? bikeRating : "cancelBooking")}
    >
      <Descriptions title="Reservation Details" bordered>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> User Name
            </>
          }
        >
          {" "}
          {currentUser?.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <MailOutlined /> Contact
            </>
          }
        >
          {currentUser?.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <DollarOutlined /> Rent
            </>
          }
        >
          On Arrival
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Get Bike On
            </>
          }
        >
          {dates?.startDate
            ? getFormatedDate(dates?.startDate)
            : getFormatedDate(getValidDataFromUrl("startDate", search))}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Return Bike On
            </>
          }
          span={2}
        >
          {dates?.endDate
            ? getFormatedDate(dates?.endDate)
            : getFormatedDate(getValidDataFromUrl("endDate", search))}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <InfoCircleOutlined /> Vehicle Info
            </>
          }
        >
          Model: {bikeForBooking?.model}
          <br />
          Color: {bikeForBooking?.color}
          <br />
          Location: {bikeForBooking?.location}
          <br />
        </Descriptions.Item>
      </Descriptions>
      {showRating && (
        <div>
          <br />
          <h1>How was your experience?</h1>
          <AppRate value={bikeRating} handleChange={(e) => setBikeRating(e)}  />
        </div>
      )}
    </AppModal>
  );
};
export default ReserveBikeDetails;
