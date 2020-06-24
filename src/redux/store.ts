import { applyMiddleware, compose, createStore } from "redux";

import reducer from "./reducers";

export default () => {
  const middlewares = [];

  const devCompose =
    DEV &&
    typeof window === "object" && // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers = devCompose || compose;

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(reducer, {}, enhancers);

  return store;
};
