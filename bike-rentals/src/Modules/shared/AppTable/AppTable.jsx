import { Table } from "antd";
const AppTable = ({ dataSource = [{}], columns = [{}], pagination = true }) => {
  return (
    <Table dataSource={dataSource} columns={columns} pagination={pagination} />
  );
};

export default AppTable;
