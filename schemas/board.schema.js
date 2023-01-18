const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

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

boardSchema.plugin(uniqueValidator, { message: "{PATH} is already taken" });

module.exports.boardSchema = boardSchema;
