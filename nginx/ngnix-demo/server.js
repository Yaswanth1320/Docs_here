const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
require("dotenv").config();

const APPNAME = process.env.APPNAME;

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log(`Request served by ${APPNAME}`);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
