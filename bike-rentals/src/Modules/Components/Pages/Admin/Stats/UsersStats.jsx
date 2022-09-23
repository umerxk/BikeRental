import React, { useEffect, useState } from "react";
import { Segmented, Col, Row, Statistic } from "antd";
import { AppMessages, AppTable } from "../../../../shared";
import {
  getAllUsers,
  getUserStatsApi,
  deleteUser
} from "../../../../Services/Apis/UserApi";
import {
  AllUsersHeader,
  FilteredUsersHeaders,
  UserBookingDetailsHeader,
} from "../../../../Constants/common";
import { getFormatedDate } from "../../../../Utils";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { UserForm } from "../../Home/HomeModules/Forms";
import Details from "./Details";
import { showDeleteConfirm } from "../../../../shared/AppConfirm/AppConfirm";

const UsersStats = React.memo(({ refreshData, setRefreshData }) => {
  const [dataSource, setDataSource] = useState([]);
  const [header, setHeader] = useState(AllUsersHeader);
  const [editUser, setEditUser] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  const [userType, setuserType] = useState("All Users");

  useEffect(() => {
    getHandleAllUsers();
  }, []);

  useEffect(() => {
    if (userType === "All Users" && refreshData === "users") {
      getHandleAllUsers(); 
      setRefreshData("");
    }
  }, [refreshData]);

  const handleDeleteUser =  (id, name) => {
    showDeleteConfirm("Delete User", `Are you sure to delete ${name}'s account?`, async (response) => {
      if(response){
        try{
          const res = await deleteUser(id);
          if(res){
            AppMessages({msg: "User Deleted", type: "success"});
            getHandleAllUsers(); 
          }
        }catch(err){
          AppMessages({msg: "Something went wrong", type: "error"});
        }
      }
    });
  }

  const getHandleAllUsers = async () => {
    const users = await getAllUsers();
    if(users.length){
      const data = users.map((user, index) => {
        return {
          key: index,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          actions: (
            <div style={{ display: "flex", gap: 20 }}>
              <EditOutlined
                onClick={() => setEditUser(user)}
                style={{ cursor: "pointer" }}
              />
              <DeleteOutlined
                onClick={() => handleDeleteUser(user._id, user.name)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ),
        };
      });
      setHeader(AllUsersHeader);
      setDataSource(data);
    }else{
      AppMessages({ msg: "No User Found", type: "error" });
      setDataSource([]);
    }
  };

  const handleViewDetails = (user, userName) => {
    const data = user.map((item, index) => {
      return {
        key: index + 1,
        userName: userName,
        bikeModel: item?.bikeId?.model ?? "Deleted Bike",
        color: item?.bikeId?.color ?? "Deleted Bike",
        location: item?.bikeId?.location ?? "Deleted Bike",
        startDate: getFormatedDate(item?.startDate),
        endDate: getFormatedDate(item?.endDate),
      };
    });
    setBookingDetails(data);
  };

  const handleUserType = async (val) => {
    setuserType(val);
    if (val !== "All Users") {
      try{
        const filteredUsers = await getUserStatsApi();
        if(filteredUsers.length){
          const data = filteredUsers.map((user, index) => {
            return {
              key: index,
              userName: user?.name,
              email: user?.email,
              totalReservedBikes: user?.data?.length,
              actions: (
                <div style={{ display: "flex", gap: 20 }}>
                  <EyeOutlined
                    onClick={() => handleViewDetails(user.data, user.name)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ),
            };
          });
          setHeader(FilteredUsersHeaders);
          setDataSource(data);
        }else{
          setHeader([]);
          setDataSource([]);
        }
      }catch(err){
        AppMessages({msg: "Something went wrong", type: "error"});
      }

    } else {
      getHandleAllUsers();
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 30 }}>User Stats</h1>
      <Segmented
        onChange={(val) => handleUserType(val)}
        block
        options={["All Users", "Users with reservation records"]}
        value={userType}
      />

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Statistic title="Total Users" value={dataSource?.length} />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <AppTable columns={header} dataSource={dataSource} pagination={false} />
      </div>

      {!!(editUser && Object.keys(editUser).length) && (
        <UserForm
          dataForEdit={editUser}
          isVisible={Boolean(Object.keys(editUser).length)}
          handleCloseModal={() => setEditUser({})}
          updateData={getHandleAllUsers}
        />
      )}

      {!!(bookingDetails && Object.keys(bookingDetails).length) && (
        <Details
          showDetails={Boolean(Object.keys(bookingDetails).length)}
          handleCloseModal={() => setBookingDetails({})}
          header={UserBookingDetailsHeader}
          dataSource={bookingDetails}
          title={bookingDetails[0]?.userName}
        />
      )}
    </>
  );
});

export default UsersStats;
