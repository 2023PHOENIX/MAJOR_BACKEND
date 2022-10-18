const express = require("express");

const morgan = require("morgan");
const mongoose = require("mongoose");

const { readdirSync } = require("fs");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
// use cors middleware for connecting frontend to backend

app.get("/api/:message", (req, res) => {
  res.status(200).send(req.params.message);
});

// routes middleware
readdirSync("./routes").map((route) => {
  app.use("/api", require(`./routes/${route}`));
});

// adding the dotenv to file paths
require("dotenv").config({ path: __dirname + "/.env" });

mongoose
  .connect(process.env.DB, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
