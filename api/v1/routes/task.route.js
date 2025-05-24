const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller")
router.get("/", taskController.index); 

router.get("/detail/:id", taskController.detail);

router.patch(
  "/change-status/:id", taskController.changeStatus
)

router.patch("/change-multi", taskController.changeMulti)

router.post("/create", taskController.createPost)

router.patch("/edit/:id", taskController.edit)

router.delete("/delete/:id", taskController.delete)
module.exports = router;