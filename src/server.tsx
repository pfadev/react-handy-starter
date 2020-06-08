import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import html from './helpers/html';

const app = express();

app.use(express.static('./dist'));

if (__DEV__) {
  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  const instance = require('webpack-dev-middleware')(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
    serverSideRender: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  app.use(instance);

  instance.waitUntilValid(() => {
    console.log('Server is running ...');
  });

  app.use(require('webpack-hot-middleware')(compiler));
}

const statsFile = path.resolve('./dist/loadable-stats.json');

const extractor = new ChunkExtractor({ statsFile });

const content = renderToString(
  <ChunkExtractorManager extractor={extractor}>
    <div>Hello World!</div>
  </ChunkExtractorManager>
);

app.get('*', (req, res) => res.send(html(content, extractor)));

app.listen(3000, 'localhost', (err) => {
  if (err) console.error(err);
});
