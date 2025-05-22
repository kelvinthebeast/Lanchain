const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller")
router.get("/", taskController.index); 

router.get("/detail/:id", taskController.detail);

router.patch(
  "/change-status/:id", taskController.changeStatus
)
module.exports = router;