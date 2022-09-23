

import { ApiClient } from "../ApiClient";
import { USER_API_ROUTES, AXIOS_METHODS } from "../../Constants/apiRoutes";

export const bikeReservationApi = (payload) => {
    return ApiClient(`${USER_API_ROUTES.RESERVATION}`, {
        method: AXIOS_METHODS.POST,
        body: payload
    });
}

export const getReservations = (bookingType) => {
    return ApiClient(`${USER_API_ROUTES.RESERVATION}/?bookingType=${bookingType}`, {
        method: AXIOS_METHODS.GET
    });
}

export const cancelReservation = (payload) => {
    return ApiClient(`${USER_API_ROUTES.RESERVATION}/?resId=${payload.resId}&bikeId=${payload.bikeId}`, {
        method: AXIOS_METHODS.PUT
    });
}
