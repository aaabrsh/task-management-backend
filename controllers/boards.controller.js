const { Board } = require("../models/board.model");
const { ObjectId} = require("mongodb")

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
  try{
    const id = ObjectId(req.params.id);
    const board = await Board.findById(id).populate('created_by');
    res.json({success: true, data: board})
  }catch(err){
    console.log(err.message);
    next(err);
  }
}

module.exports.create = async (req, res, next) => {
  try{
    const board = req.body.payload;
    const response = await Board.create(board);
    res.json({success: true, data: response})
  }catch(err){
    // console.log(err.message);
    // res.json({...err})
    err.statusCode = 400;
    next(err);
  }
}

module.exports.update = async (req, res, next) => {
  try{
    res.json({success: true, data: "endpoint works"})
  }catch(err){
    console.log(err.message);
    next(err);
  }
}
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
  try{
    res.json({success: true, data: "endpoint works"})
  }catch(err){
    console.log(err.message);
    next(err);
  }
}
//format to follow
// try {
//   res.json(await serviceName.functionName(param));
// } catch (err) {
//   console.error(err.message);
//   next(err);
// }
