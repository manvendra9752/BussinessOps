const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    timezone: {
      type: String,
      default: "UTC",
    },

    currency: {
      type: String,
      default: "INR",
    },

    companyName: {
      type: String,
      default: "BusinessOps",
    },

    companyEmail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Setting", settingSchema);
