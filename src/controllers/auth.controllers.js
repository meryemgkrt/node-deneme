require("express-async-errors");

const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIErrror = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
  console.log("login")
  const { email, password } = req.body;
  const userInfo = await user.findOne({ email });
  if (!userInfo) throw new APIErrror("Kullanıcı bulunamadı!!!", 401);
  const comparePassword = await bcrypt.compare(password, userInfo.password);

  if (!comparePassword)
    throw new APIErrror("Şifre hatalı, lütfen kontrol edin", 401)

 createToken(userInfo, res);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIErrror("Kullanıcı zaten var, başka kullanıcı gir", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);
  console.log(req.body.password);

  const newUser = new user(req.body);
  await newUser
    .save()
    .then((data) => {
      return new Response(data).created(res);
    })
    .catch((err) => {
      throw new APIErrror("Kayıt başarısız!!!", 400);
    });
};
const me = async (req, res) => {
  try {
    console.log("me içerisindeyim");
    console.log("Kullanıcı bilgileri:", req.user);
    return new Response(req.user).success(res);
  } catch (error) {
    console.error("me fonksiyonunda hata:", error);
    return new Response(null, "Sunucu hatası oluştu. Lütfen tekrar deneyin.").error500(res);
  }
};
module.exports = {
  login,
  register,
  me
};
