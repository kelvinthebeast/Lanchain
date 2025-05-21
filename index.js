const express = require('express');
const app = express();
require('dotenv').config();

const database = require('./config/database');
const port = process.env.PORT || 8686;
database.connectDB();
const Task = require('./models/task.model');
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ deleted: false });
  res.json(tasks);
});


app.get("/tasks/detail/:id", async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId, deleted: false });
  res.json(task);
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
