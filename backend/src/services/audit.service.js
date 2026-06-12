const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
  actorUserId,
  action,
  entityType,
  entityId,
  metadata = {},
}) => {
  try {
    await AuditLog.create({
      actorUserId,
      action,
      entityType,
      entityId,
      metadata,
    });
  } catch (error) {
    console.log("Audit Error", error.message);
  }
};

module.exports = {
  createAuditLog,
};
