const router = require("express").Router();
const { login, register, me } = require("../controllers/auth.controllers");
const authValidation = require("../middlewares/validations/auth.validation");
const { tokenCheck } = require("../middlewares/auth");

// Giriş rotası
router.post("/login", authValidation.login, login);

// Kayıt rotası
router.post("/register", authValidation.register, register);

// Kullanıcı bilgilerini getirme rotası
router.get("/me", tokenCheck, me);

module.exports = router;
