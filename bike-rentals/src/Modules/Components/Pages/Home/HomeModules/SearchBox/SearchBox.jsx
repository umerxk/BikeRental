import React, { useState, useContext } from "react";
import { DatePicker, Form, Button, AutoComplete, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { fetchAllBikes } from "../../../../../Services/Apis/BikesApi";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../../../../Constants/pageRoutes";
import { getDashedFormate, getValidDataFromUrl } from "../../../../../Utils";
import { GlobalContext } from "../../../../../Context/GlobalState";
import moment from "moment";
import { USER_ROLES } from "../../../../../Constants/config";

const SearchBox = React.memo(() => {
  const { search } = useLocation();
  const { user } = useContext(GlobalContext);

  const initialValues = {
    remember: true,
    model: getValidDataFromUrl("model", search) ?? "",
    startDate: getValidDataFromUrl("startDate", search)
      ? moment(getValidDataFromUrl("startDate", search))
      : "",
    endDate: getValidDataFromUrl("endDate", search)
      ? moment(getValidDataFromUrl("endDate", search))
      : "",
  };
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState(initialValues);

  const getLocations = async () => {
    const bikes = await fetchAllBikes();
    let temp = bikes.map((alb) => {
      return {
        value: alb?.model,
      };
    });
    setOptions(temp);
  };

  const onFinish = async (fieldsValue) => {
    const values = { model: fieldsValue.model };
    var url;
    if (user?.role === USER_ROLES.USER) {
      let startDate = fieldsValue["startDate"].format("YYYY-MM-DD");
      let endDate = fieldsValue["endDate"].format("YYYY-MM-DD");
      url = `/?startDate=${startDate}&endDate=${endDate}`;
    }
    if (values.model && url) {
      url += `&model=${getDashedFormate(values.model)}`;
    } else if (values.model && !url) {
      url = `/?model=${getDashedFormate(values.model)}`;
    }
    if (url) {
      navigate(`${PAGE_ROUTES.HOME_FILTERED}${url}`);
    } else {
      navigate(`${PAGE_ROUTES.HOME}`);
    }
  };

  const disabledStartDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const disabledEndDate = (current) => {
    if (formValues.startDate) {
      return current && current < formValues.startDate;
    } else {
      return current && current < moment().startOf("day");
    }
  };

  const handleValues = (_, values) => {
    if (formValues.endDate && values.startDate > formValues.endDate) {
      setFormValues({
        ...formValues,
        endDate: null,
      });
    } else {
      setFormValues(values);
    }
  };

  return (
    <>
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="Search Bikes"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            ...initialValues,
          }}
          onValuesChange={handleValues}
          onFinish={onFinish}
          size="large"
          form={form}
        >
          <Row>
            {user?.role === USER_ROLES.USER && (
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                  <h3>Pick on *</h3>
                  <Form.Item
                    name="startDate"
                    rules={[
                      {
                        required: user?.role === USER_ROLES.USER ? true : false,
                        message: "Start Date is required",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Start Date"
                      size="large"
                      disabledDate={disabledStartDate}
                      value={formValues.startDate}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                  <h3>Drop On * </h3>
                  <Form.Item
                    name="endDate"
                    rules={[
                      {
                        required: user?.role === USER_ROLES.USER ? true : false,
                        message: "End Date is required",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="End Date"
                      size="large"
                      disabledDate={disabledEndDate}
                      value={formValues.endDate ?? null}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <h3>Model</h3>

              <Form.Item name="model">
                <AutoComplete
                  style={{
                    width: 200,
                  }}
                  allowClear
                  value={formValues.model}
                  options={options}
                  placeholder="Search Models"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onClick={getLocations}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  icon={<SearchOutlined />}
                  size={"large"}
                  // loading={true}
                  // disabled={true}
                  style={{ marginTop: 30, width: 200 }}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
});
export default SearchBox;
