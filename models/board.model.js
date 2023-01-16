const mongoose = require("mongoose");
const { boardSchema } = require("../schemas/board.schema");

//board model
module.exports.Board = mongoose.model("Board", boardSchema);
