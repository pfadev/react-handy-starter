import React from "react";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";

import { NoInternet } from "../components";
import config from "../config";
import StyleWrapper from "./app.style";

export default ({ route }: any) => (
  <StyleWrapper>
    <Helmet {...config.app} />
    <Offline>
      <NoInternet />
    </Offline>
    <Online>{renderRoutes(route.routes)}</Online>
  </StyleWrapper>
);
