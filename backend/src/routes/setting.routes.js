const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/setting.controller");
const { protect } = require("../middlewares/auth");
const authorize = require("../middlewares/roles");

router.get("/", protect, getSettings);

router.put("/", protect, authorize("ADMIN"), updateSettings);

module.exports = router;
