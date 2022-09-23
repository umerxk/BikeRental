import { Rate } from "antd";
import React from "react";

const AppRate = ({ handleChange, value = 2, color="#2296FF", disableReview = false }) => (
  <Rate onChange={handleChange} value={value} style={{ color }} disabled={disableReview} name="rate" />
);

export default AppRate;
