const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//define schema
const Schema = mongoose.Schema;

//task schema
const taskSchema = new Schema(
  {
    task_id: {
      type: String,
      required: [true, "task id is required"],
    },
    name: { type: String, required: [true, "name is required"] },
    description: String,
    priority: {
      type: String,
      default: "medium",
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE} is not a valid priority",
      },
    },
    status: {
      type: String,
      default: "Backlog",
      enum: {
        values: ["backlog", "todo", "in-progress", "completed"],
        message: "{VALUE} is not a valid status",
      },
    },
    deadline: { type: Date },
    board: {
      type: Schema.Types.ObjectId,
      required: [true, "board id is required"],
      ref: "Board",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
  },
  { timestamps: true }
);

taskSchema.index(
  { task_id: 1, board: 1 },
  { unique: true, uniqueCaseInsensitive: true }
);
taskSchema.plugin(uniqueValidator, { message: "Task ID is already taken" });

module.exports.taskSchema = taskSchema;
