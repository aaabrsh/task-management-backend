const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { User } = require("../models/user.model");

//define schema
const Schema = mongoose.Schema;

//board schema
const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      uniqueCaseInsensitive: true,
    },
    description: String,
    created_by: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
      validate: {
        validator: async (value) => {
          //can't move this to validator.util.js because that creates circular dependency
          //but can move it to a new file
          return (await User.exists({ _id: this.created_by })) ? true : false;
        },
        message: "user doesn't exist",
      },
    },
  },
  { timestamps: true }
);

boardSchema.plugin(uniqueValidator, { message: "{PATH} is already taken" });

module.exports.boardSchema = boardSchema;
