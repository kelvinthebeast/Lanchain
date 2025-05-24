
const User = require("../models/user.model")
const md5 = require("md5")
const ForgotPassword = require("../models/forgot-password.model")
const generateHelper = require("../helpers/generate")
const sendMailHelper = require("../helpers/sendMail")
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


module.exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: md5(req.body.password)
  })

  if(!user) {
    res.json({
      code: 400,
      message: "user không tồn tại!!!"
    })

    return;
  }

  if(md5(req.body.password) !== user.password) {
    res.json({
      code: 400,
      message: "sai mật khẩu!!"
    })


  }
  res.cookie("tokenUser", user.token)
  res.json({
    code: 200,
    message: "Đăng nhập thành công!!",
    token: user.token
  })
}

module.exports.forgotPassword = async (req, res) => {

  const user = await User.findOne({
    email: req.body.email,
    deleted: false 
    
  })

  if (!user) {
    res.json({
      code: 400,
      message: 'Khong tim thay user'
    })

    return;
  }

  const otp = generateHelper.generateRandomNumberString(6);


  const timeExpire = 5;

  const objectForgotPassword = {
    email: user.email,
    otp: otp,
    expiresAt: Date.now() + timeExpire * 60 * 1000

  }

  
  const newForgotPassword = new ForgotPassword(objectForgotPassword)
  await newForgotPassword.save()

  // send otp through email

  

  const subject = 'Xác thực đăng nhập - Mã OTP của bạn';
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Chào bạn,</h2>
      <p>Bạn vừa yêu cầu xác thực đăng nhập vào hệ thống. Mã OTP của bạn là:</p>
      <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 16px 0;">
        ${otp}
      </div>
      <p>Mã này sẽ hết hạn sau <strong>5 phút</strong>. Nếu không phải bạn yêu cầu, hãy bỏ qua email này.</p>
      <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
    </div>
  `;
  await sendMailHelper.sendMail(req.body.email, subject, html)
  res.json({
    code: 200,
    message: "OKEE",
    objectForgotPassword: objectForgotPassword
  })
}


// check otp is access ?
module.exports.sendOtp = async (req, res) => {
  const result = await ForgotPassword.findOne({
    email: req.body.email,
    otp: req.body.otp
  })

  if(!result) {
    res.json({
      code: 400,
      message: "Wrong otp!"
    })

    return;
  }
  const user = await User.findOne({
    email: req.body.email
  })

  res.cookie("tokenUser", user.token)


  res.json({
    code: 200,
    message: "Xác thực otp thành công",
    token: user.token
  })
}