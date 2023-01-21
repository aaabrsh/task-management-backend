const { Task } = require("../models/task.model");
const { ObjectId } = require("mongodb");
const { getValidationMessages } = require("../utils/validator.util");

module.exports.get = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const task = await Task.findById(id);
    res.json({ success: true, data: task });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let newTask = new Task({
      ...req.body.payload,
      board: ObjectId(req.body.payload.board),
      created_by: ObjectId(req.body.payload.created_by),
    });
    const response = await newTask.save();
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message)
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.update = async (req, res, next) => {
  try {
    res.json({ success: true, data: "endpoint works" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
//for unique validator to run
// User.findOneAndUpdate(
//   { email: 'old-email@example.com' },
//   { email: 'new-email@example.com' },
//   { runValidators: true, context: 'query' },
//   function(err) {
//       // ...
//   }
// )

module.exports.delete = async (req, res, next) => {
  try {
    res.json({ success: true, data: "endpoint works" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
