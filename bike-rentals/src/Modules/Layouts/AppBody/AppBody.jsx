
import {  Layout } from 'antd';
const {  Content } = Layout;
const AppBody = ({ children }) => {
    return (
        <Content
        className="site-layout-background"
        style={{
          margin: "30px 100px 0px 100px",
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    );
  };
  export default AppBody;
  