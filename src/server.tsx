import path from "path";
import React from "react";
import { Provider } from "react-redux";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import { renderToString } from "react-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import config from "./config";
import html from "./helpers/html";
import createStore from "./redux/store";
import routes from "./routes";

const app = express();

app.use(compression());
app.use(helmet());
app.use(hpp());

app.use(express.static("./dist"));

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *");
});

if (DEV) {
  /* Run express as webpack dev server */
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.config.js");
  const compiler = webpack(webpackConfig);
  const instance = require("webpack-dev-middleware")(compiler, {
    headers: { "Access-Control-Allow-Origin": "*" },
    publicPath: webpackConfig.output.publicPath,
    stats: "minimal",
    serverSideRender: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  app.use(instance);

  instance.waitUntilValid(() => {
    console.log("Server is running ...");
  });

  app.use(require("webpack-hot-middleware")(compiler));
}

const statsFile = path.resolve("./dist/loadable-stats.json");

app.get("*", (req, res) => {
  const extractor = new ChunkExtractor({ statsFile });
  const staticContext = {};
  const sheet = new ServerStyleSheet();
  const store = createStore();

  try {
    const content = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            <StyleSheetManager sheet={sheet.instance}>
              {renderRoutes(routes)}
            </StyleSheetManager>
          </StaticRouter>
        </Provider>
      </ChunkExtractorManager>
    );

    res.send(html(content, extractor));
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
});

// @ts-ignore
app.listen(config.port, config.host, (err: any) => {
  if (err) console.error(err);
});
