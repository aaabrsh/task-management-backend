const { User } = require("../models/user.model");

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

    if (newUser.password.length < 8) {
      return next({
        statusCode: 400,
        message: "password must contain atleast eight characters",
      });
    }

    newUser.password = await newUser.createHash(newUser.password);
    const response = await newUser.save();

    return res.json({ success: true, data: response });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.message = {};
      const keys = Object.keys(err.errors);

      keys.forEach((key) => {
        err.message[key] = err.errors[key].message;
      });

      err.statusCode = 400;
      next(err);
    } else {
      next(err);
    }
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