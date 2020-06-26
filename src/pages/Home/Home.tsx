import React, { memo } from "react";
import Helmet from "react-helmet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { homeAction, userAction } from "../../redux/actions";
import StyleWrapper from "./home.style";

const Home = () => {
  const dipatch = useDispatch();
  const { value } = useSelector(({ home }: any) => home, shallowEqual);
  const users = useSelector(({ user: { all } }: any) => all, shallowEqual);
  const user = useSelector(({ user: { detail } }: any) => detail, shallowEqual);

  const handleIncrement = () => dipatch(homeAction.increment());

  const handleLoadAllUsers = () => dipatch(userAction.loadAll());

  const handleLoadUser = () => dipatch(userAction.load(1));

  console.log("users", users);
  console.log("user", user);

  return (
    <StyleWrapper>
      <Helmet title="Home" />
      <h1>Home</h1>
      <button type="button" onClick={handleIncrement}>
        +1
      </button>
      value:
      {value}
      <br />
      <button type="button" onClick={handleLoadAllUsers}>
        load all users
      </button>
      <br />
      <button type="button" onClick={handleLoadUser}>
        load user
      </button>
    </StyleWrapper>
  );
};

export default memo(Home);
