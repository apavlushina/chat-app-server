const express = require("express");
const bodyParse = require("body-parser");
const jsonParser = bodyParse.json();
const Sse = require("json-sse");
const cors = require("cors");
const app = express();
app.use(jsonParser);

const port = 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

app.get("/", (req, res, next) => {
  res.send("Hello");
});

const stream = new Sse();

app.get("/stream", (req, res, next) => {
  const string = JSON.stringify(messages);
  stream.updateInit(string);
  stream.init(req, res);
});

const messages = [];

app.post("/message", (req, res, next) => {
  const { message } = req.body;

  const string = JSON.stringify(message);
  stream.send(string);

  messages.push(message);
  res.send(message);
});

app.get("/message", (reg, res, next) => {
  res.send(messages);
});

app.listen(port, () => console.log(`Listening on the ${port}`));
