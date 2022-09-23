import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { loginRequest } from "../../../Services/Apis/UserApi";
import { PAGE_ROUTES } from "../../../Constants/pageRoutes";
import { GlobalContext } from "../../../Context/GlobalState";
import "./Style.css";

const SignIn = () => {
  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const url = useLocation();
  const onFinish = async (values) => {
    try {
      const res = await loginRequest(values);
      if (res?._id) {
        setUser(res);
        if (url.state) {
          navigate(`${PAGE_ROUTES.HOME_FILTERED}${url.state}`);
        } else {
          navigate(PAGE_ROUTES.HOME);
        }
      }
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Invalid Credentials");
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
      {errorMessage ? (
        <div style={{ color: "red", marginBottom: 10 }}>{errorMessage}</div>
      ) : null}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      Or <Link to={"/signup"}>register now!</Link>
    </Form>
  );
};

export default SignIn;
