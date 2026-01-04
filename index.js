const express = require("express");
const db = require("./utils/db-connection");
// const routes = require('./routes/studentRouter')
const router = require("./routes/studentRouter");
const studentModel = require("./models/students");

const app = express();

app.use(express.json());

app.use("/students", router);

db.sync()
  .then(() => {
    app.listen(3000, (err) => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  