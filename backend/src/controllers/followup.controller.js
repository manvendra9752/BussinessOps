const Followup = require("../models/Followup");

const Lead = require("../models/Lead");

const { createAuditLog } = require("../services/audit.service");

const addFollowup = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (
      req.user.role === "AGENT" &&
      lead.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const followup = await Followup.create({
      leadId: lead._id,
      followUpDate: req.body.followUpDate,
      message: req.body.message,
      createdBy: req.user._id,
    });

    await createAuditLog({
      actorUserId: req.user._id,
      action: "FOLLOWUP_CREATED",
      entityType: "FOLLOWUP",
      entityId: followup._id,
    });

    res.status(201).json({
      success: true,
      followup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLeadFollowups = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
      });
    }

    if (
      req.user.role === "AGENT" &&
      lead.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
      });
    }

    const followups = await Followup.find({
      leadId: req.params.id,
    }).sort({
      followUpDate: 1,
    });

    res.json({
      success: true,
      followups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

const updateFollowup = async (req, res) => {
  try {
    const followup = await Followup.findById(req.params.id).populate("leadId");

    if (!followup) {
      return res.status(404).json({
        success: false,
      });
    }

    if (
      req.user.role === "AGENT" &&
      followup.leadId.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
      });
    }

    followup.status = req.body.status;

    await followup.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "FOLLOWUP_UPDATED",
      entityType: "FOLLOWUP",
      entityId: followup._id,
    });

    res.json({
      success: true,
      followup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

const getFollowups = async (req, res) => {
  try {
    const { status, due } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }
    if (req.user.role === "AGENT") {
      const leads = await Lead.find({
        assignedTo: req.user._id,
      }).select("_id");

      query.leadId = {
        $in: leads.map((l) => l._id),
      };
    }

    const now = new Date();

    if (due === "today") {
      const start = new Date();

      start.setHours(0, 0, 0, 0);

      const end = new Date();

      end.setHours(23, 59, 59, 999);

      query.followUpDate = {
        $gte: start,
        $lte: end,
      };
    }

    if (due === "overdue") {
      query.followUpDate = {
        $lt: now,
      };

      query.status = "PENDING";
    }

    if (due === "upcoming") {
      query.followUpDate = {
        $gt: now,
      };
    }

    const followups = await Followup.find(query)
      .populate("leadId", "name company")
      .populate("createdBy", "name");

    res.json({
      success: true,
      followups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  addFollowup,
  getLeadFollowups,
  updateFollowup,
  getFollowups,
};
