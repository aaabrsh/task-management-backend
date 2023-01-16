const mongoose = require("mongoose");

//define schema
const Schema = mongoose.Schema;

//task schema
const taskSchema = new Schema({
  task_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    default: "medium",
    enum: ["low", "medium", "high"],
  },
  status: {
    type: String,
    default: "Backlog",
    enum: ["backlog", "todo", "in-progress", "completed"],
  },
  deadline: { type: Date },
  board: { type: Schema.Types.ObjectId, required: true, ref: "Board" },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports.taskSchema = taskSchema;
