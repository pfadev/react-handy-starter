import { applyMiddleware, compose, createStore } from "redux";

import reducer from "./reducers";

export default () => {
  const middlewares = [];

  const enhancers = compose(applyMiddleware(...middlewares));

  const store = createStore(reducer, {}, enhancers);

  return store;
};
