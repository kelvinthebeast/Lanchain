const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
router.get("/getUser", userController.getUser)

router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/forgot-password", userController.forgotPassword)

router.post("/forgot-password/otp", userController.sendOtp)

router.post("/forgot-password/reset", userController.getNewPassWord)

router.get("/info", authMiddleware.requireAuth, userController.getInfoUser)
// get user in a task
router.get("/list", authMiddleware.requireAuth, userController.getListTask)

module.exports = router