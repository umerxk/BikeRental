import {
  BarChartOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const AdminActions = [
  {
    key: "u1",
    label: "temp",
    icon: BarChartOutlined,
    action: "temp",
  },
  {
    key: "u2",
    label: "User Stats",
    icon: BarChartOutlined,
    action: "allUsers",
  },
  {
    key: "u3",
    label: "Bike Stats",
    icon: BarChartOutlined,
    action: "allBikes",
  },
  {
    key: "u4",
    label: "Create Account",
    icon: UserAddOutlined,
    action: "createAccount",
  },
  {
    key: "u5",
    label: "Add new bike",
    icon: PlusCircleOutlined,
    action: "addNewBike",
  },
];

const FilteredUsersHeaders = [
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Total Reserved Bikes",
    dataIndex: "totalReservedBikes",
    key: "totalReservedBikes",
  },
  {
    title: "View Details",
    dataIndex: "actions",
    key: "actions",
  }
];

const AllBikesHeader = [
  {
    title: "Bike Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
]

const AllUsersHeader = [
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];


const BikeBookingDetailsHeader = [
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "User Email",
    dataIndex: "userEmail",
    key: "userEmail",
  },
  {
    title: "Given Rating",
    dataIndex: "givenRating",
    key: "givenRating",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
];

const UserBookingDetailsHeader = [
  {
    title: "Sr",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Bike Model",
    dataIndex: "bikeModel",
    key: "bikeModel",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  }
  ,{
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
];

const FilteredBikesHeaders = [
  {
    title: "Bike Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Reservation Count",
    dataIndex: "resCount",
    key: "resCount",
  },
  {
    title: "View Details",
    dataIndex: "actions",
    key: "actions",
  },
];

const RatingsData = [
  { title: "fourAndup", key: 4 },
  { title: "threeAndup", key: 3 },
  { title: "twoAndup", key: 2 },
  { title: "oneAndup", key: 1 },
];

const bikeColors = ["red", "blue", "green", "yellow", "orange", "pink", "gray", "black", "purple", "navy"];

export {
  AdminActions,
  bikeColors,
  AllUsersHeader,
  FilteredUsersHeaders,
  FilteredBikesHeaders,
  UserBookingDetailsHeader,
  AllBikesHeader,
  BikeBookingDetailsHeader,
  RatingsData
};
