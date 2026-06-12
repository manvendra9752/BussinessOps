const express = require("express");

const {
  register,
  login,
  logout,
  me,
} = require("../controllers/auth.controller");

const { protect } = require("../middlewares/auth");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

router.post("/register", loginLimiter, register);

router.post("/login", loginLimiter, login);

router.post("/logout", logout);

router.get("/me", protect, me);

module.exports = router;
