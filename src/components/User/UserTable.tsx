import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Website",
    dataIndex: "website",
  },
];

export default ({ users }: any) => {
  return (
    <Table
      columns={columns}
      dataSource={users.data || []}
      loading={users.loading}
      rowKey="id"
    />
  );
};
