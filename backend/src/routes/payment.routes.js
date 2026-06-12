const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth");

const {
  createMockPayment,

  processWebhook,

  verifyWebhook,

  getPaymentLogs,
} = require("../controllers/payment.controller");

router.get("/logs/:invoiceId", protect, getPaymentLogs);

router.post("/mock-create", protect, createMockPayment);

router.post("/mock-webhook", verifyWebhook, processWebhook);

module.exports = router;
