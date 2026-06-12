const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth");

const {
  addFollowup,
  getLeadFollowups,
  updateFollowup,
  getFollowups,
} = require("../controllers/followup.controller");

router.get("/", protect, getFollowups);

router.get("/lead/:id", protect, getLeadFollowups);

router.post("/lead/:id", protect, addFollowup);

router.put("/:id", protect, updateFollowup);

module.exports = router;
