const Lead = require("../models/Lead");
const Invoice = require("../models/Invoice");
const Followup = require("../models/Followup");
const AuditLog = require("../models/AuditLog");

const getDashboard = async (req, res) => {
  try {
    const isAgent = req.user.role === "AGENT";
    const leadQuery = isAgent ? { assignedTo: req.user._id } : {};

    const totalLeads = await Lead.countDocuments(leadQuery);

    const openLeads = await Lead.countDocuments({
      ...leadQuery,
      status: { $in: ["NEW", "CONTACTED", "FOLLOW_UP"] },
    });

    const convertedLeads = await Lead.countDocuments({
      ...leadQuery,
      status: "CONVERTED",
    });

    const lostLeads = await Lead.countDocuments({
      ...leadQuery,
      status: "LOST",
    });

    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: "PAID" });
    const unpaidInvoices = await Invoice.countDocuments({
      status: { $ne: "PAID" },
    });

    const revenue = await Invoice.aggregate([
      { $match: { status: "PAID" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    let followupQuery = {
      followUpDate: { $gte: start, $lte: end },
      status: "PENDING",
    };

    if (isAgent) {
      const agentLeads = await Lead.find({ assignedTo: req.user._id }).select(
        "_id",
      );
      followupQuery.leadId = { $in: agentLeads.map((l) => l._id) };
    }

    const dueToday = await Followup.countDocuments(followupQuery);

    const recentActivity = await AuditLog.find()
      .populate("actorUserId", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalLeads,
        openLeads,
        convertedLeads,
        lostLeads,
        totalInvoices,
        paidInvoices,
        unpaidInvoices,
        totalRevenue: revenue[0]?.totalRevenue || 0,
        dueToday,
        recentActivity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
