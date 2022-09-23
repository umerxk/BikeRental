import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { AppModal, AppMessages } from "../../../../../shared";
import { createBike, updateBike } from "../../../../../Services/Apis/BikesApi";
import DartBikeIcon from "../../../../../shared/icons/DartBikeIcon";
import { bikeColors } from "../../../../../Constants/common";

const BikeForm = ({
  createBikeModal,
  handleCloseModal,
  refresh,
  dataForEdit = {},
}) => {
  const initialValues = {
    model: dataForEdit?.model ?? "",
    color: dataForEdit?.color ?? "",
    location: dataForEdit?.location ?? "",
    description: dataForEdit?.description ?? "",
  };

  const { Option } = Select;
  const { TextArea } = Input;
  const [formValues, setFormValues] = useState(initialValues);
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      if (dataForEdit._id) {
        await updateBike(formValues, dataForEdit._id);
        handleCloseModal();
        AppMessages({ msg: "Bike Updated Sucessfully !", type: "success" });
        refresh("bikes");
      } else {
        await createBike(formValues);
        handleCloseModal();
        AppMessages({ msg: "Bike Added Sucessfully !", type: "success" });
        refresh("bikes");
      }
    } catch (err) {
      AppMessages({ msg: "something went wrong !", type: "error" });
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <AppModal
      openModal={createBikeModal}
      closeModal={handleCloseModal}
      width="36%"
      okText={`${dataForEdit._id ? "Update" : "Create"} Bike`}  
      handleSubmit={onFinish}
    >
      <Form
        initialValues={formValues}
        name="normal_login"
        className="login-form"
        form={form}
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={onFinish}
        size="large"
      >
        <h1>{Object.keys(dataForEdit).length ? "Edit " : "Add New "} Bike</h1>

        <DartBikeIcon color={formValues?.color} />
        <br />
        <br />
        <br />

        <h4>Bike Model *</h4>

        <Form.Item
          name="model"
          rules={[
            {
              required: true,
              message: "Model is required",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Bike Model"
          />
        </Form.Item>
        <h4>Location *</h4>

        <Form.Item
          name="location"
          rules={[
            {
              required: true,
              message: "Location is required",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Location"
          />
        </Form.Item>

        <h4>Bike Color *</h4>
        <Form.Item
          name="color"
          rules={[
            {
              required: true,
              message: "Color is required",
            },
          ]}
        >
          <Select style={{ width: "100%" }} placeholder={"Color"}>
            {bikeColors.map((clr, index) => (
              <Option value={clr} key={index}>
                <div
                  className="flex-box"
                  style={{ justifyContent: "space-between" }}
                >
                  {capitalizeFirstLetter(clr)}

                  <div
                    className="round-div"
                    key={index}
                    style={{ backgroundColor: clr, marginTop: 7 }}
                  />
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <h4>Description</h4>
        <Form.Item name={"description"}>
          <TextArea rows={4} placeholder="Bike condition etc (optional)" />
        </Form.Item>

        {/* {errorMessage ? <div style={{color: 'red', marginBottom: 10}}>{errorMessage}</div>  : null} */}
        <br />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            
          </Button>
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default BikeForm;
