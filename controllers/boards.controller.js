const { Board } = require("../models/board.model");
const { ObjectId } = require("mongodb");
const { getValidationMessages } = require("../utils/validator.util");

module.exports.get = async (req, res, next) => {
  try {
    const created_by = ObjectId("63cda92a69dc8ef7401c0551");
    const boards = await Board.find({created_by: created_by});
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
    const id = ObjectId(req.params.id);
    const { payload } = req.body;
    let response = await Board.findByIdAndUpdate(
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
    let response = await Board.findByIdAndDelete(id);
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
