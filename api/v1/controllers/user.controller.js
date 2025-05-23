
const User = require("../models/user.model")
const md5 = require("md5")
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password)

  
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  if (exitsEmail) {
    res.json({
      code: 400,
      message: "EMAIL đã tồn tại"
    })
  } else {

    const user = new User({
      fullName: req.body.fullName,
      password: req.body.password,
      email: req.body.email
    })


    user.save()

    const token = user.token

    res.cookie("tokenUser", token)
    res.json({
      code: 200,
      message: "Đã tạo thành công user",
      token: token
    })
  }
  
} 