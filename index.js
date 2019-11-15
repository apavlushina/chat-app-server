const express = require("express");
const bodyParse = require("body-parser");
const jsonParser = bodyParse.json();
const app = express();
app.use(jsonParser);

const port = 4000;

app.get("/", (req, res, next) => {
  res.send("Hello");
});

const messages = [];

app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.get("/message", (reg, res, next) => {
  res.send(messages);
});
app.listen(port, () => console.log(`Listening on the ${port}`));
