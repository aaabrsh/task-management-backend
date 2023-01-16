const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.get);

module.exports = router;
