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
    const user = req.body.payload;
    const response = await User.create(user);
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
