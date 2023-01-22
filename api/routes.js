const express = require("express");
const router = express.Router();

const boardsRouter = require("./boards.route");
const tasksRouter = require("./tasks.route");
const usersRouter = require("./users.route");

router.use("/boards", boardsRouter);
router.use("/tasks", tasksRouter);
router.use("/users", usersRouter);

module.exports = router;