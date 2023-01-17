const mongoose = require("mongoose");

//define schema
const Schema = mongoose.Schema;

//board schema
const boardSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    created_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports.boardSchema = boardSchema;
