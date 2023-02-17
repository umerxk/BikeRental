import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { AppSkelton, AppEmpty, AppMessages } from "../../../../../shared";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../../../../Context/GlobalState";
import { USER_ROLES } from "../../../../../Constants/config";
import {
  getFilteredBikes,
  fetchAllBikes,
  deleteBike,
} from "../../../../../Services/Apis/BikesApi";
import ReserveBikeDetails from "../ReserveBikeDetails";
import BikeCards from "../BikeCards";
import Filters from "../Filters";
import { BikeForm } from "../Forms";
import { PAGE_ROUTES } from "../../../../../Constants/pageRoutes";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { getValidDataFromUrl } from "../../../../../Utils";
import { bikeReservationApi } from "../../../../../Services/Apis/ReservationApi";
import "../../Style.css";
import { showDeleteConfirm } from "../../../../../shared/AppConfirm/AppConfirm";

const BikesList = React.memo(() => {
  const { user } = useContext(GlobalContext);
  const [reserveBikeModal, setReserveModal] = useState(false);
  const [allBikes, setAllBikes] = useState([]);
  const [createBikeModal, setCreateBikeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});
  const [bikeForBooking, setBikeForBooking] = useState({});
  const [newView, setNewView] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    handleGetBikes();
  }, [search]);

  const getOrganizedPayload = (data) => {
    let payload = {};
    for (let i = 0; i < data.length; i++) {
      payload[data[i]] = getValidDataFromUrl(data[i], search);
    }
    return payload;
  };

  const handleGetBikes = async () => {
    var payload;
    if (user?.role !== USER_ROLES.USER || search) {
      payload = getOrganizedPayload([
        "startDate",
        "endDate",
        "model",
        "color",
        "location",
        "rating",
      ]);
      payload.userRole = user?.role;
      if (
        (payload.startDate && payload.endDate) ||
        user?.role !== USER_ROLES.USER
      ) {
        try {
          setLoading(true);
          const res = await getFilteredBikes(payload);
          setAllBikes(res);
        } catch (err) {
          AppMessages({
            msg: err?.response?.data?.message || "something went wrong",
            type: "error",
          });
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 700);
        }
      }
    }
  };

  useEffect(() => {
    user?.role !== USER_ROLES.USER && !search && getAllBikes();
  }, [user]);

  const getAllBikes = async () => {
    try {
      setLoading(true);
      const res = await fetchAllBikes();
      setAllBikes(res);
    } catch (err) {
      AppMessages({ msg: err?.response?.data?.message, type: "error" });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAction = (e, bike) => {
    if (e === "edit") {
      setDataForEdit(bike);
      setCreateBikeModal(true);
    }
    if (e === "del") {
      showDeleteConfirm(
        "Delete Bike",
        `Are you sure to delete ${bike?.model}`,
        async (response) => {
          if (response) {
            try {
              const res = await deleteBike(bike?._id);
              if (res) {
                AppMessages({ msg: "Bike Deleted", type: "success" });
                handleGetBikes();
              }
            } catch (err) {
              AppMessages({ msg: "Something went wrong", type: "error" });
            }
          }
        }
      );
    }

    if (e === "Reserve") {
      if (!user?._id) {
        navigate(PAGE_ROUTES.LOGIN, {
          state: search,
        });
      } else {
        setReserveModal(true);
        setBikeForBooking(bike);
      }
    }
  };

  const iconStyle = {
    color: "blue",
    fontSize: 22,
  };

  const isFromVisible = () => {
    return !!(
      (getValidDataFromUrl("startDate", search) &&
        getValidDataFromUrl("endDate", search)) ||
      user?.role !== USER_ROLES.USER
    );
  };

  const CardView = ({ bike, index }) => (
    <BikeCards
      bike={bike}
      index={index}
      cardsView={newView}
      handleAction={handleAction}
      userRole={user?.role}
      actionText="Reserve"
      actionIcon={<PushpinOutlined />}
      disableReview={true}
    />
  );

  const handleBooking = async () => {
    const payload = {
      userId: user?._id,
      bikeId: bikeForBooking?._id,
      startDate: getValidDataFromUrl("startDate", search),
      endDate: getValidDataFromUrl("endDate", search),
    };
    try {
      await bikeReservationApi(payload);
      setReserveModal(false);
      AppMessages({ msg: "Bike successfully reserved !", type: "success" });
      navigate(PAGE_ROUTES.RESERVATIONS);
    } catch (err) {
      AppMessages({
        msg: "Something went wrong, please try again !",
        type: "error",
      });
    }
  };

  const showFilters = () => {
    let flag = false;
    const filters = ["color", "rating", "location", "model"];
    filters.forEach((fl) => {
      if (search.includes(fl)) {
        flag = true;
      }
    });
    return flag;
  };

  return (
    <>
      {isFromVisible() && !!allBikes?.length && (
        <Row style={{ float: "right", marginTop: 18, gap: 20, fontSize: 20 }}>
          <p style={{ marginTop: -8, fontSize: 20 }}>View</p>
          <AppstoreOutlined
            style={newView ? iconStyle : {}}
            onClick={() => setNewView(true)}
          />
          <UnorderedListOutlined
            style={!newView ? iconStyle : {}}
            onClick={() => setNewView(false)}
          />
        </Row>
      )}

      {loading ? (
        <AppSkelton />
      ) : isFromVisible() ? (
        <Row gutter={42} style={{ marginTop: 70 }}>
          {(showFilters() || allBikes?.length) && (
            <Col span={6}>
              <Filters />
            </Col>
          )}

          {!!allBikes.length ? (
            newView ? (
              <Col span={18}>
                <Row>
                  {allBikes?.map((bike, index) => (
                    <CardView bike={bike} index={index} key={index} />
                  ))}
                </Row>
              </Col>
            ) : (
              <Col span={18}>
                {allBikes?.map((bike, index) => (
                  <CardView bike={bike} index={index} key={index} />
                ))}
              </Col>
            )
          ) : (
            <div
              style={{
                marginLeft: showFilters() ? "15%" : "35%",
              }}
            >
              <AppEmpty
                title="No Bike Found"
                btnTitle="Add New Bike"
                handleClick={() => setCreateBikeModal(true)}
                showButton={user?.role === USER_ROLES.MANAGER ? true : false}
              />
            </div>
          )}
        </Row>
      ) : (
        <AppEmpty
          title="Book bikes on your desired date"
          btnTitle="Add New Bike"
          handleClick={() => setCreateBikeModal(true)}
          showButton={user?.role === USER_ROLES.MANAGER ? true : false}
        />
      )}

      {!!createBikeModal && (
        <BikeForm
          createBikeModal={createBikeModal}
          handleCloseModal={() => {
            setCreateBikeModal(false);
            setDataForEdit({});
          }}
          dataForEdit={dataForEdit}
          refresh={getAllBikes}
        />
      )}
      {!!reserveBikeModal && (
        <ReserveBikeDetails
          reserveBikeModal={reserveBikeModal}
          handleCloseModal={() => setReserveModal(false)}
          currentUser={user}
          bikeForBooking={bikeForBooking}
          handleSubmit={handleBooking}
          okText="Reserve Now"
        />
      )}
    </>
  );
});
export default BikesList;
