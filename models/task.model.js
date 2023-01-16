const mongoose = require("mongoose");
const { taskSchema } = require("../schemas/task.schema");

//task model
module.exports.Task = mongoose.model("Task", taskSchema);
