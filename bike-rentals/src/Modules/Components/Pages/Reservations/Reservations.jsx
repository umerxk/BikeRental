import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalState";
import {
  getReservations,
  cancelReservation,
} from "../../../Services/Apis/ReservationApi";
import { rateBikeApi } from "../../../Services/Apis/BikesApi";
import { Row, Segmented, Badge, Col } from "antd";
import { AppMessages } from "../../../shared";
import {
  DeleteOutlined,
  AppstoreOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ReserveBikeDetails from "../Home/HomeModules/ReserveBikeDetails";
import BikeCards from "../Home/HomeModules/BikeCards";
import { showConfirm } from "../../../shared/AppConfirm/AppConfirm";

const bookingsDataTypes = {
  pastBookings: "Past",
  activeBookings: "Active",
  futureBookings: "Future",
}


const Reservations = () => {
  const { user } = useContext(GlobalContext);
  const [bookings, setBookings] = useState([]);
  const [bookingType, setBookingType] = useState(bookingsDataTypes.activeBookings);
  const [reserveBikeModal, setReserveBikeModal] = useState({});

  useEffect(() => {
    getMyBookings(bookingType);
  }, [bookingType]);

  const getMyBookings = async (bookingType) => {
    try {
      const response = await getReservations(bookingType);
      if(response.data.length){
        setBookings(response.data);
      }else{
        setBookings([]);
      }
    } catch (err) {
      AppMessages({
        msg: "Something went wrong, please try again !",
        type: "error",
      });
    }
  };

  const handleUserType = async (val) => {
    setBookingType(val);
  };

  const handleAction = (e, bike) => {
      setReserveBikeModal(bike);
  };

  const handleCloseModal = () => {
    setReserveBikeModal({});
  };

  const handleCancelBooking = async (response) => {
    if (response) {
      try {
        const payload = {
          bikeId: reserveBikeModal._id,
          resId: reserveBikeModal.reservationId
        }
        const cancelBooking = await cancelReservation(payload);
        AppMessages({ msg: cancelBooking?.message, type: "success" });
        setReserveBikeModal({});
        getMyBookings(bookingType)
      } catch (err) {
        AppMessages({
          msg: "Something went wrong, please try again !",
          type: "error",
        });
      }
    } else {
      return;
    }
  };

  const handleSubmit = async (value) => {
    if(bookingType === bookingsDataTypes.futureBookings){
      showConfirm("Cancel Reservation", "Are you sure ?", handleCancelBooking);
    }
    if(bookingType === bookingsDataTypes.pastBookings){
      showConfirm("Rate Bike", `Give ${value} stars ?`, (e) =>handleRating(e, value));
    }
  };

  const getOkText = () => {
    if(bookingType === bookingsDataTypes.futureBookings ){
      return "Cancel Reservation";
    }
    if(bookingType === bookingsDataTypes.pastBookings ){
      return "Rate Bike";
    }
  }

  const handleRating = async (response, rating) => {
    if (response) {
      try {
        const payload = {
          bikeId: reserveBikeModal._id,
          rating,
          resId: reserveBikeModal.reservationId
        }
        await rateBikeApi(payload);
        AppMessages({ msg: `Rated ${rating} stars `, type: "success" });
        setReserveBikeModal({});
        getMyBookings(bookingType)
      } catch (err) {
        AppMessages({
          msg: "Something went wrong, please try again !",
          type: "error",
        });
      }
    } else {
      return;
    }
  }

  return (
    <>
      <Segmented
        onChange={(val) => handleUserType(val)}
        block
        options={[
          {
            label: "Past Bookings",
            value: bookingsDataTypes.pastBookings,
          },
          {
            label: <Badge status="processing" text="Active Bookings" />,
            value: bookingsDataTypes.activeBookings,
          },
          {
            label: "Future Bookings",
            value: bookingsDataTypes.futureBookings,
          },
        ]}
        value={bookingType}
      />
      {!!bookings.length ? (
        <Row gutter={[24, 24]}>
          {bookings?.map((bike, index) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <BikeCards
                bike={bike}
                index={index}
                handleAction={(e) => handleAction(e, bike)}
                userRole={user?.role}
                actionText={ bookingType === bookingsDataTypes.pastBookings ? "Rate Bike" : "Booking Details"}
                actionIcon={<EyeOutlined />}
                key={index}
                disableReview={true}
                rating={bike?.reservationRating}
                myRating={true}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <h1 style={{ fontSize: 30, textAlign: "center", marginTop: "20vh" }}>
          No {bookingType} Booking Yet !
        </h1>
      )}

      {!!Object.keys(reserveBikeModal).length && (
        <ReserveBikeDetails
          reserveBikeModal={Boolean(Object.keys(reserveBikeModal).length)}
          handleCloseModal={handleCloseModal}
          dates={{
            startDate: reserveBikeModal.bookingStartDate,
            endDate: reserveBikeModal.bookingEndDate,
          }}
          currentUser={user}
          bikeForBooking={reserveBikeModal}
          handleSubmit={handleSubmit}
          okText={getOkText()}
          showRating={bookingType === bookingsDataTypes.pastBookings}
        />
      )}
    </>
  );
};
export default Reservations;
