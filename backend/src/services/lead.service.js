const Lead = require("../models/Lead");
const User = require("../models/User");

const assignLead = async (req, res) => {
  const lead_id = req.params.id;
  const lead = await Lead.findById(lead_id);
  const assignedTo = req.body.assignedTo;

  if (!lead) {
    throw new Error("Lead not found");
  }

  const agent = await User.findById(assignedTo);

  if (!agent) {
    throw new Error("Agent not found");
  }

  if (agent.role !== "AGENT") {
    throw new Error("Only AGENT users can be assigned");
  }

  const updatedLead = await Lead.findByIdAndUpdate(
    lead_id,
    {
      assignedTo,
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate("assignedTo", "name email role");
  res.status(200).json({
    success: true,
    response: updatedLead,
  });
};

module.exports = {
  assignLead,
};
