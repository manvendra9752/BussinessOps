const Invoice = require("../models/Invoice");
const Lead = require("../models/Lead");
const { calculateInvoice } = require("../services/invoice.service");
const generateInvoiceNumber = require("../utils/generateInvoiceNumber");
const { createAuditLog } = require("../services/audit.service");

const createInvoice = async (req, res) => {
  try {
    const { leadId, clientName, items, taxPercentage, discount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    if (!leadId && !clientName) {
      return res.status(400).json({
        success: false,
        message: "Either leadId or clientName is required",
      });
    }

    const { processedItems, subtotal, taxAmount, totalAmount } =
      calculateInvoice({
        items,
        taxPercentage,
        discount,
      });

    const invoice = await Invoice.create({
      leadId,
      clientName,
      invoiceNumber: generateInvoiceNumber(),
      items: processedItems,
      subtotal,
      taxPercentage: taxPercentage || 0,
      taxAmount,
      discount: discount || 0,
      totalAmount,
      createdBy: req.user._id,
    });

    await createAuditLog({
      actorUserId: req.user._id,
      action: "INVOICE_CREATED",
      entityType: "INVOICE",
      entityId: invoice._id,
      metadata: { invoiceNumber: invoice.invoiceNumber, totalAmount },
    });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("leadId");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search = "" } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: "i" } },
        { clientName: { $regex: search, $options: "i" } },
      ];
    }

    const invoices = await Invoice.find(query)
      .populate("leadId", "name company")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Invoice.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const allowed = ["DRAFT", "SENT", "CANCELLED"];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Only DRAFT, SENT, CANCELLED allowed. PAID status can only be set via payment webhook.",
      });
    }

    const oldStatus = invoice.status;
    invoice.status = req.body.status;
    await invoice.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "INVOICE_STATUS_UPDATED",
      entityType: "INVOICE",
      entityId: invoice._id,
      metadata: { oldStatus, newStatus: invoice.status },
    });

    res.json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const oldStatus = invoice.status;
    invoice.status = "SENT";
    await invoice.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "INVOICE_SENT",
      entityType: "INVOICE",
      entityId: invoice._id,
      metadata: { oldStatus, newStatus: "SENT" },
    });

    res.json({
      success: true,
      message: "Invoice sent successfully (mock email notification)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoiceStatus,
  sendInvoice,
};
