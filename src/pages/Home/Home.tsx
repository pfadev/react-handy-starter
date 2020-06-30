import React, { memo, useEffect } from "react";
import Helmet from "react-helmet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { homeAction, userAction } from "../../redux/actions";
import { UserTable } from "../../components";
import StyleWrapper from "./home.style";

const Home = () => {
  const dipatch = useDispatch();
  const { value } = useSelector(({ home }: any) => home, shallowEqual);
  const users = useSelector(({ user: { all } }: any) => all, shallowEqual);
  const user = useSelector(({ user: { detail } }: any) => detail, shallowEqual);

  const handleIncrement = () => dipatch(homeAction.increment());

  const handleLoadUser = () => dipatch(userAction.load(1));

  useEffect(() => {
    dipatch(userAction.loadAll());
  }, []);

  console.log("user", user);

  return (
    <StyleWrapper>
      <Helmet title="Home" />
      <h1>Home</h1>
      <Button onClick={handleIncrement}>+1</Button>
      value:
      {value}
      <br />
      <UserTable users={users} />
      <br />
      <button type="button" onClick={handleLoadUser}>
        load user
      </button>
    </StyleWrapper>
  );
};

export default memo(Home);
