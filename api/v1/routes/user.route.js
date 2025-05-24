const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/forgot-password", userController.forgotPassword)

router.post("/forgot-password/otp", userController.sendOtp)
module.exports = router