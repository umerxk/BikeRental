import { Empty, Button } from "antd";

const AppEmpty = ({ title = "No data found", showButton = true, handleClick, btnTitle="Create Now" }) => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 200,
      marginTop: 20
    }}
    description={<span>{title}</span>}
  >
    {showButton && (
      <Button type="primary" onClick={handleClick}>
        {btnTitle}
      </Button>
    )}
  </Empty>
);

export default AppEmpty;
