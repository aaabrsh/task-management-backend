const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const validator = require("../utils/validator.util");

//define schema
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      uniqueCaseInsensitive: true,//for uniqueValidator
      validate: {
        validator: (value) => {
          return validator.validateUsername(value);
        },
        message: "Invalid Username",
      },
    },
    first_name: { type: String, required: [true, "first name is required"] },
    last_name: { type: String, required: [true, "last name is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      uniqueCaseInsensitive: true,
      validate: {
        validator: (value) => {
          return validator.validateEmail(value);
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profile_image: String,
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} is already taken" });

module.exports.userSchema = userSchema;
