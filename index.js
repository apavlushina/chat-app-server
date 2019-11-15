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

const streams = {};

app.get("/stream", (req, res, next) => {
  const rooms = Object.keys(messages);
  const string = JSON.stringify(rooms);
  stream.updateInit(string);
  stream.init(req, res);
});

app.get("/room/;roomName", (req, res, next) => {
  const { roomName } = req.params;

  const stream = streams[roomName];

  const data = messages[roomName];

  const string = JSON.stringify(data);
  stream.updateInit(string);
  stream.init(req, res);
});

function send(data) {
  const string = JSON.stringify(data);
  stream.send(string);
}

app.post("/room", (req, res, next) => {
  const { name } = req.body;
  messages[name] = [];
  rooms.push(name);
  send(message);

  res.send(name);
});

// app.get("/stream", (req, res, next) => {
//   const string = JSON.stringify(messages);
//   stream.updateInit(string);
//   stream.init(req, res);
// });

const messages = {};

app.post("/message/:roomName", (req, res, next) => {
  const { message } = req.body;
  const { roomName } = req.params;

  const room = messages[roomName];

  const stream = stream[roomName];
  const string = JSON.stringify(message);
  stream.send(string);
  streams[name] = new Sse();

  room.push(message);

  res.send(message);
});

app.get("/message", (reg, res, next) => {
  res.send(messages);
});

app.listen(port, () => console.log(`Listening on the ${port}`));
