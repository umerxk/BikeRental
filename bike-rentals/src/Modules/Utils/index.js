import moment from "moment";

const getSpacedFormate = (value) => {
    return value?.split("_").join(" ");
};

export const getDashedFormate = (value) => {
    return value.split(" ").join("_");
};

export const getParmsFromUrl = (key, searchParams) => {
    return new URLSearchParams(searchParams)?.get(key);
};

export const getValidDataFromUrl = (value, searchParams) => {
    return getSpacedFormate(getParmsFromUrl(value, searchParams))
}

export const getFormatedDate = (value) => {
    return moment(value).format("DD MMMM, YYYY");
}
