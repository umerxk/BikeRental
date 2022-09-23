import { ApiClient } from "../ApiClient";
import { USER_API_ROUTES, AXIOS_METHODS } from "../../Constants/apiRoutes";

export const loginRequest = (data) => {
  return ApiClient(`${USER_API_ROUTES.LOGIN}`, {
    method: AXIOS_METHODS.POST,
    body: data,
  });
};

export const getCurrentUser = () => {
    return ApiClient(`${USER_API_ROUTES.USER}${USER_API_ROUTES.ME}`, {
        method: AXIOS_METHODS.GET,
    });
}

export const getAllUsers = () => {
    return ApiClient(`${USER_API_ROUTES.USER}`, {
        method: AXIOS_METHODS.GET,
    });
}

export const deleteUser = (id) => {
    return ApiClient(`${USER_API_ROUTES.USER}/${id}`, {
        method: AXIOS_METHODS.DELETE,
    });
}

export const getUserStatsApi = () => {
    return ApiClient(`${USER_API_ROUTES.USER}${USER_API_ROUTES.USER_STATS}`, {
        method: AXIOS_METHODS.GET,
    });
}

export const signUpRequest = (data) => {
    return ApiClient(`${USER_API_ROUTES.REGISTER}`, {
        method: AXIOS_METHODS.POST,
        body: data,
    });
}

export const createUser = (data) => {
    return ApiClient(`${USER_API_ROUTES.USER}`, {
        method: AXIOS_METHODS.POST,
        body: data,
    });
}

export const editUser = (data, userId) => {
    return ApiClient(`${USER_API_ROUTES.USER}/${userId}`, {
        method: AXIOS_METHODS.PUT,
        body: data,
    });
}
