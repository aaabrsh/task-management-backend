const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");

//read
router.get("/", tasksController.get);
router.get("/board_id", tasksController.getAllInBoard);
// router.get("/:id", tasksController.getOne);

//create
router.post("/", tasksController.create);

//update
router.put("/:id", tasksController.update);

//delete
router.delete("/:id", tasksController.delete);

module.exports = router;
