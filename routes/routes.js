const express = require("express");
const router = express.Router();

const boardsRouter = require("../routes/boards.route");
const tasksRouter = require("../routes/tasks.route");
const usersRouter = require("../routes/users.route");

router.use("/boards", boardsRouter);
router.use("/tasks", tasksRouter);
router.use("/users", usersRouter);

module.exports = router;