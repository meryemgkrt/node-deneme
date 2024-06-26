const jwt = require("jsonwebtoken");
const { promisify } = require("util"); // promisify fonksiyonunu içe aktarın
const APIErrror = require("../utils/errors");
const User = require("../models/user.model");


const createToken = async (user, res) => {
  console.log(user);
  const payload = {
    sub: user._id,
    name: user.name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return res.status(200).json({
    success: true,
    token,
    message: "Token oluşturuldu",
  });
};

const tokenCheck = async (req, res, next) => {
    try {
      console.log("tokenCheck çalıştı");
      const headerToken =
        req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  
      if (!headerToken) {
        console.error("Token bulunamadı");
        throw new APIErrror("Token bulunamadı", 401);
      }
  
      const token = req.headers.authorization.split(" ")[1];
      console.log("Token:", token);
  
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded token:", decoded);
  
      const userInfo = await User.findById(decoded.sub).select("_id name lastname email");
      console.log("User info:", userInfo);
  
      if (!userInfo) {
      
        throw new APIErrror("Kullanıcı bulunamadı-Kullanıcı yok", 401);
      }
  
      req.user = userInfo;
      next();
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      if (error.name === 'JsonWebTokenError') {
        next(new APIErrror("Token geçersiz", 401));
      } else if (error instanceof APIErrror) {
        next(error);
      } else {
        next(new APIErrror("Token doğrulama hatası", 500));
      }
    }
  };
  

module.exports = {
  createToken,
  tokenCheck,
};
