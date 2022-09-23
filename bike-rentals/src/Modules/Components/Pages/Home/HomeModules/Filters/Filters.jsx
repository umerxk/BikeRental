import React, { useState } from "react";
import { Collapse, AutoComplete } from "antd";
import { RatingsData } from "../../../../../Constants/common";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRate } from "../../../../../shared";
import { bikeColors } from "../../../../../Constants/common";
import { fetchAllBikes } from "../../../../../Services/Apis/BikesApi";
import { PAGE_ROUTES } from "../../../../../Constants/pageRoutes";
import "./Style.css";

const { Panel } = Collapse;

const Filters = React.memo(() => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const initialValues = {
    location: "",
    color: "",
    rating: "",
  };
  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState([]);

  const getLocations = async () => {
    const bikes = await fetchAllBikes();
    let temp = bikes.map((alb) => {
      return {
        value: alb?.location,
      };
    });
    setOptions(temp);
  };

  const handleForm = (name, val) => {
    setValues({
      ...values,
      [name]: val,
    });
    let url = search;
    if (url.includes(name)) {
      for (let [key, value] of searchParams.entries()) {
        if (key === name) {
          url = url.replace(value, `${val}`);
        }
      }
    } else {
      var newUrl;
      if(url){
        newUrl = `&${name}=${val}`;
         url = url + newUrl;
      }else{
        newUrl = `/?${name}=${val}`;
        url = newUrl;
      }
    }
    navigate(`${PAGE_ROUTES.HOME_FILTERED}${url}`);
  };

  return (
    <div className="filters-parent">
      <div style={{ backgroundColor: "#fafafa", padding: 20 }}>Filters</div>
      <Collapse defaultActiveKey={["3", "2", "1"]}>
        <Panel header="Avg customer review" key="3">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {RatingsData.map((el, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  cursor: "pointer",
                  textDecoration: search.includes(el.title)
                    ? "underline"
                    : "none",
                }}
                key={index}
                onClick={() => handleForm("rating", el.title)}
              >
                <AppRate
                  value={el.key}
                  color={"#FFA14C"}
                  disableReview={true}
                />
                <p style={{ marginTop: 7, fontWeight: 400 }}>& Up</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel header="Color" key="1">
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {bikeColors.map((clr, index) => (
              <div
                key={index}
                className="round-div"
                style={{ backgroundColor: clr }}
                onClick={() => handleForm("color", clr)}
              />
            ))}
          </div>
        </Panel>
        <Panel header="Location" key="2">
          <p>Search in your Area</p>
          <AutoComplete
            style={{
              width: 200,
            }}
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            placeholder="Select your location"
            fieldNames="location"
            onClick={getLocations}
            onSelect={(val) => handleForm("location", val)}
          />
        </Panel>
      </Collapse>
    </div>
  );
});
export default Filters;
