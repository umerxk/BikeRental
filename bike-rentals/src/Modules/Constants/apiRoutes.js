const USER_API_ROUTES = {
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  USER: "/users",
  UPDATE: "/users/update",
  REGISTER: "/users/register",
  DELETE: "/users/delete",
  RESERVATION: "/reservation",
  ME: "/me",
  USER_STATS: "/getUserStats",
};

const BIKE_API_ROUTES = {
    BIKES: "/bikes",
    FETCH_ALL: "/fetchAll",
    RATE: "/rate",
    BIKE_STATS: "/getBikeStats"
};

const AXIOS_METHODS = {
  POST: "post",
  GET: "get",
  DELETE: "delete",
  PUT: "put",
};


export { AXIOS_METHODS, USER_API_ROUTES, BIKE_API_ROUTES };
