import { ApiClient } from "../ApiClient";
import { BIKE_API_ROUTES, AXIOS_METHODS } from "../../Constants/apiRoutes";
import {RatingsData} from "../../Constants/common";

function getRating(rating){
  let value;
  RatingsData.forEach((val) => {
    if(val.title === rating){
      value = val.key
    }
  })
  return parseInt(value);
}

export const getBikeStatsApi = () => {
    return ApiClient(`${BIKE_API_ROUTES.BIKES}${BIKE_API_ROUTES.BIKE_STATS}`, {
        method: AXIOS_METHODS.GET,
    });
}

export const fetchAllBikes = () => {
  return ApiClient(`${BIKE_API_ROUTES.BIKES}${BIKE_API_ROUTES.FETCH_ALL}`, {
    method: AXIOS_METHODS.GET,
  });
};

export const getFilteredBikes = (data) => {
  return ApiClient(
    `${BIKE_API_ROUTES.BIKES}?startDate=${data.startDate ?? ""}&endDate=${
      data.endDate ?? ""
    }&model=${data?.model ?? ""}&userRole=${data?.userRole ?? ""}&color=${data?.color ?? ""}&rating=${data?.rating ? getRating(data?.rating) : ""}&location=${
      data?.location ?? ""
    }`,
    {
      method: AXIOS_METHODS.GET,
    }
  );
};

export const createBike = (data) => {
  return ApiClient(`${BIKE_API_ROUTES.BIKES}`, {
    method: AXIOS_METHODS.POST,
    body: data,
  });
};

export const updateBike = (data, id) => {
  return ApiClient(`${BIKE_API_ROUTES.BIKES}/${id}`, {
    method: AXIOS_METHODS.PUT,
    body: data,
  });
};

export const rateBikeApi = (payload) => {
  return ApiClient(`${BIKE_API_ROUTES.BIKES}${BIKE_API_ROUTES.RATE}`, {
    method: AXIOS_METHODS.POST,
    body: payload
  });
}

export const deleteBike = (id) => {
  return ApiClient(`${BIKE_API_ROUTES.BIKES}/${id}`, {
      method: AXIOS_METHODS.DELETE,
  });
}
