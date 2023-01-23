const { Task } = require("../models/task.model");
const { ObjectId } = require("mongodb");
const { getValidationMessages } = require("../utils/validator.util");

module.exports.get = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      created_by: ObjectId("63cda92a69dc8ef7401c0551"),
    });
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.getAllInBoard = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      board: ObjectId(req.params.board_id),
      created_by: ObjectId("63cda92a69dc8ef7401c0551"),
    });
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

// module.exports.getOne = async (req, res, next) => {
//   try {
//     const id = ObjectId(req.params.id);
//     const task = await Task.findById(id);
//     res.json({ success: true, data: task });
//   } catch (err) {
//     console.log(err.message);
//     next(err);
//   }
// };

module.exports.create = async (req, res, next) => {
  try {
    let newTask = new Task({
      ...req.body.payload,
      board: ObjectId(req.body.payload.board),
      // created_by: ObjectId(req.body.payload.created_by),
      created_by: ObjectId("63cda92a69dc8ef7401c0551"),
    });
    const response = await newTask.save();
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const { payload } = req.body;
    let response = await Task.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true, runValidators: true, context: "query" }
    );
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    let response = await Task.findByIdAndDelete(id);
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
