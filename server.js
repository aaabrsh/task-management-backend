const express = require("express");
const createError = require("http-errors");

const boardsRouter = require("./routes/boards.route");
const tasksRouter = require("./routes/tasks.route");

const app = express();

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/boards", boardsRouter);
app.use("/tasks", tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ success: false, message: err.message });

  return;
});

//0.0.0.0 means listen on all interfaces(including over ip address) - it is the default
app.listen(port, "0.0.0.0", () =>
  console.log(`Server Listening on port ${port}`)
);
