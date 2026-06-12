const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth");

const upload = require("../middlewares/upload");

const {
  uploadLeadAttachment,

  uploadInvoiceAttachment,

  getAttachments,

  getLeadAttachments,

  getInvoiceAttachments,

  deleteAttachment,
} = require("../controllers/upload.controller");

router.get("/", protect, getAttachments);

router.get("/lead/:id", protect, getLeadAttachments);

router.get("/invoice/:id", protect, getInvoiceAttachments);

router.post("/lead/:id", protect, upload.single("file"), uploadLeadAttachment);

router.post(
  "/invoice/:id",
  protect,
  upload.single("file"),
  uploadInvoiceAttachment,
);

router.delete("/:id", protect, deleteAttachment);

module.exports = router;
