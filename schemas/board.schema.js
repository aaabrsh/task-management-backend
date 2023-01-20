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
    },
  },
  { timestamps: true }
);

boardSchema.methods.userExists = async function () {
  return await User.exists({ _id: this.created_by }) ? true : false;
};

boardSchema.plugin(uniqueValidator, { message: "{PATH} is already taken" });

module.exports.boardSchema = boardSchema;
