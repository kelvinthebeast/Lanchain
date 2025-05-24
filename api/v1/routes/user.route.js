const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/forgot-password", userController.forgotPassword)
module.exports = router