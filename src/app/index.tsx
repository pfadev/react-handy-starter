import React from "react";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";

import config from "../config";
import StyleWrapper from "./app.style";

export default ({ route }: any) => (
  <StyleWrapper>
    <Helmet {...config.app} />
    {renderRoutes(route.routes)}
  </StyleWrapper>
);
