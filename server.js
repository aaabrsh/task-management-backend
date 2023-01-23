const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const routes = require("./routes/routes");
const cors = require("cors");
const { User } = require("./models/user.model");
const { Board } = require("./models/board.model");
const { Task } = require("./models/task.model");

const { local_uri } = require("./configs/db.config");

const app = express();

//db connection
module.exports = mongoose
  .connect(process.env.ATLAS_URI || local_uri)
  .then((result) => {
    console.log("Successfully Connected to Database!");

    const port = process.env.PORT || 5000;
    app.listen(port, "0.0.0.0/0", () =>
      console.log(`Server Listening on port ${port}`)
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/api", (req, res) => {
      res.send("works");
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler middleware
    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 5000;
      console.error(err.message, err.stack);
      res.status(statusCode).json({ success: false, message: err.message });

      return;
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });
