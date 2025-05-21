const Task = require("../models/task.model");
module.exports.index = async (req, res) => {
  const task = await Task.find({ deleted: false });
  res.json(task);  

}

module.exports.detail = async (req, res) => {

  const taskId = req.params.id;

  const task = await Task.findOne({_id: taskId, deleted: false });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
}