const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10,
});

app.use(limiter);

module.exports = {
  limiter,
  loginLimiter,
};
