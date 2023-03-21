const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routes/homeRouter");

const port = process.env.PORT || 8080;

const app = express();

// db connection

mongoose.connect("mongodb://localhost:27017/userdata", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("error in connection");
});
db.once("open", () => {
  console.log("Connected to database");
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/", homeRouter);

app.listen(port);
