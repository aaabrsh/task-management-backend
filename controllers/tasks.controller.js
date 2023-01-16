const get = (req, res, next) => {
    try {
      res.json([{ id: 1, task: "Test Task" }]);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  };
  
  module.exports = {
      get
  }
  