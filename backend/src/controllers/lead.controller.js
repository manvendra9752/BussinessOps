const Lead = require("../models/Lead");
const User = require("../models/User");
const { createAuditLog } = require("../services/audit.service");

const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, status, assignedTo, notes } =
      req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      status,
      assignedTo,
      notes,
    });

    await createAuditLog({
      actorUserId: req.user._id,
      action: "LEAD_CREATED",
      entityType: "LEAD",
      entityId: lead._id,
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLeads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      assignedTo,
      sort = "newest",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    if (req.user.role === "AGENT") {
      query.assignedTo = req.user._id;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ createdAt: sort === "oldest" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (
      req.user.role === "AGENT" &&
      (!lead.assignedTo ||
        lead.assignedTo._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLead = async (req, res) => {
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
      (!lead.assignedTo ||
        lead.assignedTo.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const oldStatus = lead.status;
    const { name, email, phone, company, source, status, notes } = req.body;

    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (phone !== undefined) lead.phone = phone;
    if (company !== undefined) lead.company = company;
    if (source !== undefined) lead.source = source;
    if (status !== undefined) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "LEAD_UPDATED",
      entityType: "LEAD",
      entityId: lead._id,
      metadata: { oldStatus, newStatus: lead.status },
    });

    res.json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "LEAD_DELETED",
      entityType: "LEAD",
      entityId: lead._id,
    });

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const assignLead = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const agent = await User.findById(assignedTo);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    if (agent.role !== "AGENT") {
      return res.status(400).json({
        success: false,
        message: "Only AGENT users can be assigned leads",
      });
    }

    const oldAssignee = lead.assignedTo;
    lead.assignedTo = assignedTo;
    await lead.save();

    const updatedLead = await Lead.findById(lead._id).populate(
      "assignedTo",
      "name email role",
    );

    await createAuditLog({
      actorUserId: req.user._id,
      action: "LEAD_ASSIGNED",
      entityType: "LEAD",
      entityId: lead._id,
      metadata: {
        oldAssignee: oldAssignee?.toString(),
        newAssignee: assignedTo,
      },
    });

    res.status(200).json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  assignLead,
};
