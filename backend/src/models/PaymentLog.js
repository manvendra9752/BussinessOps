const mongoose = require("mongoose");

const paymentLogSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    provider: {
      type: String,
      default: "MOCK",
    },

    status: String,

    payload: Object,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PaymentLog", paymentLogSchema);
