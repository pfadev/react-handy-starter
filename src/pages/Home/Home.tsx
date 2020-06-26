import React, { memo } from "react";
import Helmet from "react-helmet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";

import { homeAction, userAction } from "../../redux/actions";
import StyleWrapper from "./home.style";

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

const Home = () => {
  const dipatch = useDispatch();
  const { value } = useSelector(({ home }: any) => home, shallowEqual);
  const users = useSelector(({ user: { all } }: any) => all, shallowEqual);
  const user = useSelector(({ user: { detail } }: any) => detail, shallowEqual);

  const handleIncrement = () => dipatch(homeAction.increment());

  const handleLoadAllUsers = () => dipatch(userAction.loadAll());

  const handleLoadUser = () => dipatch(userAction.load(1));

  console.log("user", user);

  return (
    <StyleWrapper>
      <Helmet title="Home" />
      <h1>Home</h1>
      <Button onClick={handleIncrement}>+1</Button>
      value:
      {value}
      <br />
      <Button
        disabled={users.loading}
        loading={users.loading}
        onClick={handleLoadAllUsers}
      >
        load all users
      </Button>
      <Table
        columns={columns}
        dataSource={users.data || []}
        loading={users.loading}
        rowKey="id"
      />
      <br />
      <button type="button" onClick={handleLoadUser}>
        load user
      </button>
    </StyleWrapper>
  );
};

export default memo(Home);
