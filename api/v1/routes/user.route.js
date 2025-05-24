const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
router.get("/getUser", userController.getUser)

router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/forgot-password", userController.forgotPassword)

router.post("/forgot-password/otp", userController.sendOtp)

router.post("/forgot-password/reset", userController.getNewPassWord)

router.get("/info", userController.getInfoUser)
module.exports = router