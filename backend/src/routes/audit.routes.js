const express = require("express");

const router = express.Router();

const { getAuditLogs } = require("../controllers/audit.controller");
const { protect } = require("../middlewares/auth");
const authorize = require("../middlewares/roles");

router.get("/", protect, authorize("ADMIN", "MANAGER"), getAuditLogs);

module.exports = router;
