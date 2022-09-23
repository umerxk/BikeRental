import React, { useEffect, useState } from "react";
import { Segmented, Col, Row, Statistic } from "antd";
import { AppMessages, AppTable } from "../../../../shared";

import {
  AllBikesHeader,
  BikeBookingDetailsHeader,
  FilteredBikesHeaders,
} from "../../../../Constants/common";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { BikeForm } from "../../Home/HomeModules/Forms";
import Details from "./Details";
import {
  fetchAllBikes,
  getBikeStatsApi,
  deleteBike,
} from "../../../../Services/Apis/BikesApi";
import { getFormatedDate } from "../../../../Utils";
import { showDeleteConfirm } from "../../../../shared/AppConfirm/AppConfirm";

const BikesStats = React.memo(({ refreshData, setRefreshData }) => {
  const [dataSource, setDataSource] = useState([]);
  const [header, setHeader] = useState(AllBikesHeader);
  const [editBike, setEditBike] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  const [bikeType, setBikeType] = useState("All Bikes");

  const statTypes = ["All Bikes", "Bikes with reservation records"];

  useEffect(() => {
    getAllBikes();
  }, []);

  useEffect(() => {
    if (bikeType === "All Bikes" && refreshData === "bikes") {
      getAllBikes();
      setRefreshData("");
    }
  }, [refreshData]);

  const handleDeleteBike = (bikeId, bikeModel) => {
    showDeleteConfirm(
      "Delete Bike",
      `Are you sure to delete ${bikeModel}`,
      async (response) => {
        if (response) {
          try {
            const res = await deleteBike(bikeId);
            if (res) {
              AppMessages({ msg: "Bike Deleted", type: "success" });
              getAllBikes();
            }
          } catch (err) {
            AppMessages({ msg: "Something went wrong", type: "error" });
          }
        }
      }
    );
  };

  const getAllBikes = async () => {
    try {
      const bikes = await fetchAllBikes();
      if (bikes.length) {
        const data = bikes.map((bike, index) => {
          return {
            key: index,
            model: bike?.model,
            location: bike?.location,
            color: bike?.color,
            rating: bike?.rating ?? "Not Rated Yet",
            actions: (
              <div style={{ display: "flex", gap: 20 }}>
                <EditOutlined
                  onClick={() => setEditBike(bike)}
                  style={{ cursor: "pointer" }}
                />
                <DeleteOutlined
                  onClick={() => handleDeleteBike(bike._id, bike.model)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ),
          };
        });
        setHeader(AllBikesHeader);
        setDataSource(data);
      } else {
        AppMessages({ msg: bikes?.message, type: "error" });
        setDataSource([]);
      }
    } catch (err) {
      AppMessages({ msg: err?.response?.data?.message, type: "error" });
    }
  };

  const handleViewDetails = (bike, bikeModel) => {
    const data = bike.map((item, index) => {
      return {
        key: index + 1,
        bikeModel,
        userName: item?.user?.name ?? "Deleted User",
        userEmail: item?.user?.email ?? "Deleted User",
        startDate: getFormatedDate(item?.startDate),
        endDate: getFormatedDate(item?.endDate),
        givenRating: item.rating,
      };
    });
    setBookingDetails(data);
  };

  const handleBikeType = async (e) => {
    setBikeType(e);
    if (e === statTypes[1]) {
      const resp = await getBikeStatsApi();
      if (resp.length) {
        const data = resp.map((bike, index) => {
          return {
            key: index,
            model: bike?.model,
            location: bike?.location,
            color: bike?.color,
            rating: bike?.rating ?? "Not Rated Yet",
            resCount: bike.data?.length,
            actions: (
              <div style={{ display: "flex", gap: 20 }}>
                <EyeOutlined
                  onClick={() => handleViewDetails(bike.data, bike?.model)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ),
          };
        });
        setHeader(FilteredBikesHeaders);
        setDataSource(data);
      } else {
        AppMessages({ msg: resp?.message, type: "error" });
        setDataSource([]);
      }
    } else {
      getAllBikes();
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 30 }}>Bike Stats</h1>
      <Segmented
        onChange={(val) => handleBikeType(val)}
        block
        options={statTypes}
        value={bikeType}
      />

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Statistic title="Total Bikes" value={dataSource?.length} />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <AppTable columns={header} dataSource={dataSource} pagination={false} />
      </div>

      {!!(editBike && Object.keys(editBike).length) && (
        <BikeForm
          createBikeModal={Boolean(Object.keys(editBike).length)}
          handleCloseModal={() => setEditBike({})}
          refresh={getAllBikes}
          dataForEdit={editBike}
        />
      )}

      {!!(bookingDetails && Object.keys(bookingDetails).length) && (
        <Details
          showDetails={Boolean(Object.keys(bookingDetails).length)}
          handleCloseModal={() => setBookingDetails({})}
          header={BikeBookingDetailsHeader}
          dataSource={bookingDetails}
          title={bookingDetails[0].bikeModel}
        />
      )}
    </>
  );
});

export default BikesStats;
