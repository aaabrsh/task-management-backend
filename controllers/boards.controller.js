const get = (req, res, next) => {
  try {
    res.json([{ id: 1, board: "Test Board" }]);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

//format to follow
// try {
//   res.json(await serviceName.functionName(param));
// } catch (err) {
//   console.error(err.message);
//   next(err);
// }

module.exports = {
  get,
};
