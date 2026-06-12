const Lead = require("../models/Lead");

const checkLeadOwnership = async (req, res, next) => {
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

      message: "Forbidden",
    });
  }

  req.lead = lead;

  next();
};

module.exports = checkLeadOwnership;
