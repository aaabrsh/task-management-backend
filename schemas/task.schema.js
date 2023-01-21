const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { User } = require("../models/user.model");
const { Board } = require("../models/board.model");

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
        message: "{VALUE} is not a valid priority type",
      },
    },
    status: {
      type: String,
      default: "backlog",
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
      validate: {
        validator: async (value) => {
          //can't move this to validator.util.js because that creates circular dependency
          //but can move it to a new file
          return (await Board.exists({ _id: value })) ? true : false;
        },
        message: "board doesn't exist",
      },
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
      validate: {
        validator: async (value) => {
          return (await User.exists({ _id: value })) ? true : false;
        },
        message: "user doesn't exist",
      },
    },
  },
  { timestamps: true }
);

taskSchema.index(
  { task_id: 1, board: 1 },
  { unique: true }
);
taskSchema.plugin(uniqueValidator, { message: "task ID in the given board is taken" });

module.exports.taskSchema = taskSchema;
