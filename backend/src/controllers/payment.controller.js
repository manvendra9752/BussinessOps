const Invoice = require("../models/Invoice");

const PaymentLog = require("../models/PaymentLog");

const { createAuditLog } = require("../services/audit.service");
const createMockPayment = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    await PaymentLog.create({
      invoiceId: invoice._id,

      status: "PAYMENT_INITIATED",

      payload: {
        amount: invoice.totalAmount,
      },
    });

    res.json({
      success: true,

      paymentSession: {
        invoiceId: invoice._id,

        amount: invoice.totalAmount,

        transactionId: "TXN_" + Date.now(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyWebhook = (req, res, next) => {
  const secret = req.headers["x-webhook-secret"];

  if (secret !== process.env.MOCK_WEBHOOK_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Invalid webhook secret",
    });
  }

  next();
};
const processWebhook = async (req, res) => {
  try {
    const { invoiceId, paymentStatus, transactionId } = req.body;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: false,
      });
    }

    if (paymentStatus === "SUCCESS") {
      invoice.status = "PAID";

      await invoice.save();

      await PaymentLog.create({
        invoiceId: invoice._id,

        status: "PAID",

        payload: {
          transactionId,
        },
      });

      await createAuditLog({
        action: "PAYMENT_SUCCESS",

        entityType: "INVOICE",

        entityId: invoice._id,

        metadata: {
          transactionId,
        },
      });
    }

    if (paymentStatus === "FAILED") {
      await PaymentLog.create({
        invoiceId: invoice._id,

        status: "FAILED",

        payload: {
          transactionId,
        },
      });

      await createAuditLog({
        action: "PAYMENT_FAILED",

        entityType: "INVOICE",

        entityId: invoice._id,
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPaymentLogs = async (req, res) => {
  try {
    const logs = await PaymentLog.find({
      invoiceId: req.params.invoiceId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMockPayment,

  processWebhook,

  verifyWebhook,

  getPaymentLogs,
};
