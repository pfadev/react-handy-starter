import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import html from './helpers/html';

const content = renderToString(<div>Hello World!</div>)

const app = express();

app.use(express.static('./dist'));

app.get("*", (req, res) => res.send(html(content)));

app.listen(3000, 'localhost', (err) => {
  if (err) console.error(err);
});
