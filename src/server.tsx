import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import html from './helpers/html';

const content = renderToString(<div>Hello World!</div>)

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

app.get('*', (req, res) => res.send(html(content)));

app.listen(3000, 'localhost', (err) => {
  if (err) console.error(err);
});
