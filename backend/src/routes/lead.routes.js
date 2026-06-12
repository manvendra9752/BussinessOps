const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const authorize = require("../middlewares/roles");
const validate = require("../middlewares/validate");
const { createLeadSchema } = require("../validations/lead.validation");
const {
  addFollowup,
  getLeadFollowups,
} = require("../controllers/followup.controller");
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  assignLead,
} = require("../controllers/lead.controller");

router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.post(
  "/",
  protect,
  authorize("ADMIN", "MANAGER"),
  validate(createLeadSchema),
  createLead,
);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, authorize("ADMIN", "MANAGER"), deleteLead);
router.get("/:id/followups", protect, getLeadFollowups);
router.post("/:id/followups", protect, addFollowup);
router.patch("/:id/assign", protect, authorize("ADMIN", "MANAGER"), assignLead);

module.exports = router;
