import React from "react";
import { matchRoutes, renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";

import { NoInternet } from "../components";
import config from "../config";
import urlHelper from "../helpers/url.helper";
import StyleWrapper from "./app.style";

export default ({ location, route }: any) => {
  const params = matchRoutes(route.routes, location.pathname).reduce(
    (acc, { match: { params: cur } }) => ({ ...acc, ...cur }),
    {}
  );

  const query = urlHelper.parse(location);

  return (
    <StyleWrapper>
      <Helmet {...config.app} />
      <Offline>
        <NoInternet />
      </Offline>
      <Online>{renderRoutes(route.routes, { params, query })}</Online>
    </StyleWrapper>
  );
};
