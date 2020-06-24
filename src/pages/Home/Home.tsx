import React, { memo } from "react";
import Helmet from "react-helmet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { homeAction } from "../../redux/actions";
import StyleWrapper from "./home.style";

const Home = () => {
  const dipatch = useDispatch();
  const { value } = useSelector(({ home }: any) => home, shallowEqual);

  const handleIncrement = () => dipatch(homeAction.increment());

  return (
    <StyleWrapper>
      <Helmet title="Home" />
      <h1>Home</h1>
      <button type="button" onClick={handleIncrement}>
        +1
      </button>
      value:
      {value}
    </StyleWrapper>
  );
};

export default memo(Home);
