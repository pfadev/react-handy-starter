import React from "react";
import { renderRoutes } from "react-router-config";

import StyleWrapper from "./app.style";

export default ({ route }: any) => (
  <StyleWrapper>
    {renderRoutes(route.routes)}
  </StyleWrapper>
);
