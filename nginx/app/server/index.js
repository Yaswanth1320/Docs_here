const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hello from server1</h2>");
});

app.listen(7777, () => {
  console.log("Server running in port 7777");
});
