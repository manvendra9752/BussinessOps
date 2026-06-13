const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    lineTotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  },
);

const invoiceSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    clientName: {
      type: String,
    },

    invoiceNumber: {
      type: String,
      unique: true,
    },

    items: [invoiceItemSchema],

    subtotal: {
      type: Number,
      default: 0,
    },

    taxPercentage: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["DRAFT", "SENT", "PAID", "CANCELLED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Invoice", invoiceSchema);
