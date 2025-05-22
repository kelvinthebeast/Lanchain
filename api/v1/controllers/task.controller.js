const { Cursor } = require("mongoose");
const Task = require("../models/task.model");
const paginationHelper = require("../helpers/pagination")
const searchHelper = require("../helpers/search")
module.exports.index = async (req, res) => {

  let find = {
    deleted: false
  }

  if (req.query.status){
    find.status = req.query.status;
  }

  // sort
  
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  
  // sort

  // Pagination

  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  }

  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(initPagination, req.query, countTasks);
  // Pagination


  // search

  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  // end search

  const task = await Task.find(find).sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems)
    
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

module.exports.changeStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const status = req.body.status;
    await Task.updateOne({
      _id: taskId
    }, {
      status: status
    }) 
    res.json({
      code: 200,
      message: "Cập nhập trạng thái thành công"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tìm thấy sản phẩm"
    })
    
  }
  
}