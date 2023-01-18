const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

//read
router.get("/", usersController.get);

//create
router.post("/", usersController.create);

module.exports = router;