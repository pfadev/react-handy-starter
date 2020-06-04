import express from 'express';
import html from './helpers/html';

const app = express();

app.get("*", (req, res) => res.send(html()));

app.listen(3000, 'localhost', (err) => {
  if (err) console.error(err);
});
