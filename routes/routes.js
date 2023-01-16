const express = require("express");
const router = express.Router();

const boardsRouter = require("../routes/boards.route");
const tasksRouter = require("../routes/tasks.route");

router.use("/boards", boardsRouter);
router.use("/tasks", tasksRouter);

module.exports = router;