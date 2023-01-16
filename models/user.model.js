const mongoose = require("mongoose");
const { userSchema } = require("../schemas/user.schema");

//user model
module.exports.User = mongoose.model("User", userSchema);
