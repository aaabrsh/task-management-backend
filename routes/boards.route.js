const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boards.controller");

//read
router.get("/", boardsController.get);
router.get("/:id", boardsController.getOne);

//create
router.post("/", boardsController.create);

//update
router.put("/:id", boardsController.update);

//delete
router.delete("/:id", boardsController.delete);

module.exports = router;