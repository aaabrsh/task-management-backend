const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { validateUsername, validateEmail } = require("../utils/validator.util");

//define schema
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      uniqueCaseInsensitive: true, //for uniqueValidator
      validate: {
        validator: (value) => {
          return validateUsername(value);
        },
        message: "invalid Username",
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
          return validateEmail(value);
        },
        message: "invalid Email",
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

userSchema.post("validate", function (doc, next) {
  if (doc.password.length < 8) {
    let err = new Error("password must contain atleast eight characters");
    err.statusCode = 400;
    throw err;
  }
  next();
});

//create a hash from plain text
userSchema.pre("save", async function (next) {
  //schema middleware
  /**
   * SALTING: adding random data to the input of a hash function to
   * guarantee a unique output even when the inputs are the same. */

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

//Validating a candidate password
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.plugin(uniqueValidator, { message: "{PATH} is already taken" });

module.exports.userSchema = userSchema;
