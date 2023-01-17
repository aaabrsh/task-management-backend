const mongoose = require("mongoose");
const validator = require("../utils/validator.util");

//define schema
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        return validator.validateUsername(value);
      },
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        return validator.validateEmail(value);
      },
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        return validator.validatePassword(value);
      },
    },
    profile_image: String,
  },
  { timestamps: true }
);

module.exports.userSchema = userSchema;
