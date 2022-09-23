import axios from "axios";
import {
  API_BASE_URL,
  USER_ACCESS_TOKEN_KEY,
  USER_ID,
} from "../Constants/config";

axios.interceptors.request.use(function (requestConfig) {
  let token = {
    Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`,
  };
  return {
    ...requestConfig,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store,no-cache",
      source: "portal",
      Pragma: "no-cache",
      Expires: "0",
      ...token,
    },
  };
});

axios.interceptors.response.use(
  function (response) {
    if (response.data?.token) {
      localStorage.setItem(USER_ACCESS_TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_ID, response.data._id);
    }

    return response;
  },
  async function (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.data?.status === 401
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const baseResponseHandler = (response) => {
  return response.data;
};

export const ApiClient = async (url, config = {}) => {
  const newConfig = { ...config };

  const apiBaseUrl = API_BASE_URL;
  newConfig.url = `${apiBaseUrl}${url}`;
  if (config.body) {
    if (config.method !== "GET") {
      newConfig.data = config.body;
    } else {
      newConfig.params = config.body;
    }
  }
  const response = await axios(newConfig);
  return baseResponseHandler(response);
};
