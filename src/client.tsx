import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { loadableReady } from "@loadable/component";

import createStore from "./redux/store";

// @ts-ignore
const store = createStore(window.INITIAL_STATE);

const render = (routes: Array<any>) =>
  ((module as any).hot ? ReactDOM.render : ReactDOM.hydrate)(
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>,
    document.getElementById("react-view")
  );

loadableReady(() => render(require("./routes").default));

if ((module as any).hot) {
  (module as any).hot.accept("./routes", () => {
    try {
      render(require("./routes").default);
    } catch (error) {
      console.error(` Routes hot reloading error ${error}`);
    }
  });
}
