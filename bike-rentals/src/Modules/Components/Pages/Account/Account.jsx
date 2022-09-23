import { GlobalContext } from "../../../Context/GlobalState";
import { useContext } from "react";
import { Avatar } from "antd";
import { AppTable } from "../../../shared";
import "./Style.css";

const Account = () => {
  const { user } = useContext(GlobalContext);
  const dataSource = [
    {
      key: "1",
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <>
      <div className="account-parent" />
      <center>
        <Avatar
          style={{
            backgroundColor: "#7265e6",
            marginTop: -80,
          }}
          size="large"
          gap={1}
        >
          {user?.name.substring(0, 6)}
        </Avatar>
        <div style={{ marginTop: 20 }}>
          <AppTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </center>
    </>
  );
};
export default Account;
