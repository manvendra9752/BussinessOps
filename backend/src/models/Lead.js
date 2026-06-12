const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      default: "Website",
    },

    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "LOST"],
      default: "NEW",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
leadSchema.index({
  name: "text",
  email: "text",
  phone: "text",
  company: "text",
});

module.exports = mongoose.model("Lead", leadSchema);
