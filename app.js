const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors("*"));

app.use("/", (req, res) => {
  console.log("This is the backend for a backend vide app");
  res.send("This is the backend for a backend vide app");
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
