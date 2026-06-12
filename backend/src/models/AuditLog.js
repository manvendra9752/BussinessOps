const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actorUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: String,

    entityType: String,

    entityId: String,

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);
auditLogSchema.index({
  createdAt: -1,
});
module.exports = mongoose.model("AuditLog", auditLogSchema);
