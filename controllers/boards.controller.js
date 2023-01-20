const { Board } = require("../models/board.model");
const { ObjectId } = require("mongodb");
const { getValidationMessages } = require("../utils/validator.util");

module.exports.get = async (req, res, next) => {
  try {
    const boards = await Board.find();
    res.json({ success: true, data: boards });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const board = await Board.findById(id);
    res.json({ success: true, data: board });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let newBoard = new Board({
      ...req.body.payload,
      created_by: ObjectId(req.body.payload.created_by),
    });
    if (!(await newBoard.userExists())) {
      return res
        .status(400)
        .json({ success: false, message: { created_by: "user not found" } });
    }
    const response = await newBoard.save();
    res.json({ success: true, data: response });
  } catch (err) {
    if (err.name === "ValidationError") {
      next(getValidationMessages(err));
    } else {
      next(err);
    }
  }
};

module.exports.update = async (req, res, next) => {
  try {
    res.json({ success: true, data: "endpoint works" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
//for unique validator to run
// User.findOneAndUpdate(
//   { email: 'old-email@example.com' },
//   { email: 'new-email@example.com' },
//   { runValidators: true, context: 'query' },
//   function(err) {
//       // ...
//   }
// )

module.exports.delete = async (req, res, next) => {
  try {
    res.json({ success: true, data: "endpoint works" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
