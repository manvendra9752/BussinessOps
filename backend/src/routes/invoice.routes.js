const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth");

const authorize = require("../middlewares/roles");

const {
  createInvoice,

  getInvoiceById,

  getInvoices,

  updateInvoiceStatus,

  sendInvoice,
} = require("../controllers/invoice.controller");

router.get("/", protect, getInvoices);

router.get("/:id", protect, getInvoiceById);

router.post(
  "/",
  protect,
  authorize("ADMIN", "MANAGER", "FINANCE"),
  createInvoice,
);

router.put(
  "/:id/status",
  protect,
  authorize("ADMIN", "MANAGER", "FINANCE"),
  updateInvoiceStatus,
);

router.post(
  "/:id/send",
  protect,
  authorize("ADMIN", "MANAGER", "FINANCE"),
  sendInvoice,
);

module.exports = router;
