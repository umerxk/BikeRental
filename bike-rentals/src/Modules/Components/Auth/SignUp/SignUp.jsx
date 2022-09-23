import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { signUpRequest } from "../../../Services/Apis/UserApi";
import { PAGE_ROUTES } from "../../../Constants/pageRoutes";
import { GlobalContext } from "../../../Context/GlobalState";
import "../SignIn/Style.css";

const SignUp = () => {
  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return;
    } else {
      try {
        delete values.confirmPassword;
        const res = await signUpRequest(values);
        if (res?._id) {
          setUser(res);
          navigate(PAGE_ROUTES.HOME);
        }
      } catch (err) {
        setErrorMessage(err?.response?.data?.msg || "Invalid Credentials");
      }
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form form-style"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size="large"
      style={{ width: "50%", margin: "auto", marginTop: 100, padding: 40 }}
    >
      <h1>Login</h1>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "User name required",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="User name"
        />
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          autoComplete="new-email"
        />
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
          prefix={<LockOutlined className="site-form-item-icon" />}
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      {errorMessage ? (
        <div style={{ color: "red", marginBottom: 10 }}>{errorMessage}</div>
      ) : null}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Create account
        </Button>
      </Form.Item>
      Or <Link to={"/login"}>Login now!</Link>
    </Form>
  );
};

export default SignUp;
