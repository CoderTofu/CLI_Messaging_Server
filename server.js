const express = require("express");
const app = express();
const PORT = 3000;

const CLIENTS = [];

app.get("/", (req, res) => {
  console.log(req);
  res.send("Client connection detected!");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}!`);
});
