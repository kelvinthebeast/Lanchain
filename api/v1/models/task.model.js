const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  content: {
    type: String,
    default: ''
  },
  timeStart: {
    type: Date,
    required: true
  },
  timeFinish: {
    type: Date,
    required: true
  },
  taskParentId: String,
  listUser: Array,
  createdBy: String,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});
const Task = mongoose.model('Task', taskSchema, 'tasks');
module.exports = Task;
