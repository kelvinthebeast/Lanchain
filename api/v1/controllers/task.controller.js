const { Cursor } = require("mongoose");
const Task = require("../models/task.model");
const paginationHelper = require("../helpers/pagination")
const searchHelper = require("../helpers/search")
module.exports.index = async (req, res) => {

  let find = {
    $or: [
      {createdBy: req.user.id}, 
      {
        listUser: req.user.id
      }
    ],
    deleted: false
  }

  if (req.query.status) {
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

  const task = await Task.findOne({ _id: taskId, deleted: false });
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



module.exports.changeMulti = async (req, res) => {
  try {
    const ids = req.body.ids; // Array of IDs
    const key = req.body.key;
    const value = req.body.value;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        code: 400,
        message: "Danh sách ID không hợp lệ"
      });
    }

    switch (key) {
      case "status":
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          status: value
        })

        res.json({
          code: 200,
          message: `Cập nhật task thành công`
        });

        break;
      case "delete":
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          deleted: true,
          deletedAt: new Date()
        })
        res.json({
          code: 200,
          message: `delete task thành công`
        });

        break;
      default:
        res.json({
          code: 400,
          message: `Không update task thành công`
        });
        break;
    }


  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Đã xảy ra lỗi server",
      error: error.message
    });
  }
};

module.exports.createPost = async (req, res) => {

  try {
    req.body.createdBy = req.user.id
    const newTask = new Task(req.body);
    const data = await newTask.save()

    res.json({
      code: 200,
      data: data,
      message: "Create Task okee",
      createdBy: req.body.createdBy
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi"
    })
  }

}
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({_id: id}, req.body)

    res.json({
      code: 200,
      message: "Edit successfully"
    })
  } catch (error) {
    res.json({
      code: 200,
      message: "Edit Wrong!!"
    })
  }
}

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({_id: id}, {
      deleted: true,
      deletedAt: new Date()
    })

    res.json({
      code: 200,
      message: "Delete successfully"
    })
  } catch (error) {
    res.json({
      code: 200,
      message: "Delete Wrong!!"
    })
  }
}