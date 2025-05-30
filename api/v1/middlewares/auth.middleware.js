const User = require("../models/user.model")
module.exports.requireAuth = async (req, res, next) => {
  
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]


    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password")
    if (!user) {
      res.json({
        code: 400,
        message: "Token không hợp lên"
      })

      return;
    }

    req.user = user // use to print data in next ware
    next()
  } 
  else {
    res.json({
      code: 400,

      message: "vui lòng gửi kèm token"
    })
  }
}