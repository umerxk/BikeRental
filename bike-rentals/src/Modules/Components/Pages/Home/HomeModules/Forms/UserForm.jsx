import { useState } from "react";
import { Form, Input, Select } from "antd";
import { AppModal, AppMessages } from "../../../../../shared";
import { createUser, editUser } from "../../../../../Services/Apis/UserApi";
import { USER_ROLES } from "../../../../../Constants/config";

const UserForm = ({
  isVisible,
  handleCloseModal,
  updateData,
  refresh,
  dataForEdit = {},
}) => {
  const initialValues = {
    name: dataForEdit?.name ?? "",
    email: dataForEdit?.email ?? "",
    role: dataForEdit?.role ?? null,
    password: dataForEdit?.password ?? "",
    confirmPassword: "",
  };

  const { Option } = Select;
  const [formValues, setFormValues] = useState(initialValues);
  const [form] = Form.useForm();

  const getValidData = (obj) => {
    for (var propName in obj) {
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  };

  const onFinish = async () => {
    try {
      if (dataForEdit._id) {
        const validData = getValidData(formValues);
        await editUser(validData, dataForEdit._id);
        handleCloseModal();
        AppMessages({ msg: "User Updated Sucessfully !", type: "success" });
        updateData();
      } else {
        delete formValues.confirmPassword;
        await createUser(formValues);
        AppMessages({ msg: "User Added Sucessfully !", type: "success" });
        handleCloseModal();
        refresh("users");
      }
    } catch (err) {
      AppMessages({ msg: "something went wrong !", type: "error" });
    }
  };

  function getLowerCaseString(string) {
    return string.toLowerCase();
  }
  return (
    <AppModal
      openModal={isVisible}
      closeModal={handleCloseModal}
      defautlFooter={false}
      width="36%"
      handleSubmit={onFinish}
      okText={`${Object.keys(dataForEdit).length ? "Edit" : "Create"} User`}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={formValues}
        onFinish={onFinish}
        size="large"
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <h1> {Object.keys(dataForEdit).length ? "Edit" : "Create New"} User</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "User name required",
            },
          ]}
        >
          <Input placeholder="User name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Invalid Email",
            },
            {
              required: true,
              message: "Email Required",
            },
          ]}
        >
          <Input placeholder="Email" autoComplete="new-email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Confirm password required!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "Role is required",
            },
          ]}
        >
          <Select style={{ width: "100%" }} placeholder="Role">
            {Object.keys(USER_ROLES).map((role, index) => (
              <Option key={index}>{getLowerCaseString(role)}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default UserForm;
