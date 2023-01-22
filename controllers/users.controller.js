const { ObjectId } = require("mongodb");
const { User } = require("../models/user.model");
const { getValidationMessages } = require("../utils/validator.util");

module.exports.get = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ success: true, data: users });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let newUser = new User({ ...req.body.payload });
    const response = await newUser.save();

    return res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const { payload } = req.body;
    let response = await User.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true, runValidators: true, context: "query" }
    );
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    let response = await User.findByIdAndDelete(id);
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

//For Signin
// asyncHandler(async (req, res) => {
//     // Find user with requested email
//     let user = await User.findOne({ email: req.body.email });
//     if (user === null) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found.",
//       });
//     } else {
//       if (await user.validatePassword(req.body.password)) {
//         return res.status(200).json({
//           success: true,
//           message: "User Successfully Logged In",
//         });
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: "Incorrect Password",
//         });
//       }
//     }
//   })
// );
