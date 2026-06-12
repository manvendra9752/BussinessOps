const cloudinary = require("../config/cloudinary");
const Attachment = require("../models/Attachment");
const streamifier = require("streamifier");

const { createAuditLog } = require("../services/audit.service");
const uploadToCloudinary = (fileBuffer) => {
  // const resourceType = mimeType === "application/pdf" ? "raw" : "image";
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "businessops",
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const uploadLeadAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File required",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    console.log("Cloudinary Result =>", {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
    });
    const attachment = await Attachment.create({
      fileName: req.file.originalname,

      fileUrl: result.secure_url,

      fileType: req.file.mimetype,

      fileSize: req.file.size,

      uploadedBy: req.user._id,

      leadId: req.params.id,

      publicId: result.public_id,
    });

    await createAuditLog({
      actorUserId: req.user._id,

      action: "LEAD_ATTACHMENT_UPLOADED",

      entityType: "LEAD",

      entityId: req.params.id,
    });

    res.status(201).json({
      success: true,
      attachment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const uploadInvoiceAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    console.log("Cloudinary Result =>", {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
    });
    const attachment = await Attachment.create({
      fileName: req.file.originalname,

      fileUrl: result.secure_url,

      fileType: req.file.mimetype,

      fileSize: req.file.size,

      uploadedBy: req.user._id,

      invoiceId: req.params.id,
    });

    await createAuditLog({
      actorUserId: req.user._id,

      action: "INVOICE_ATTACHMENT_UPLOADED",

      entityType: "INVOICE",

      entityId: req.params.id,
    });

    res.status(201).json({
      success: true,
      attachment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
const getAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find({}).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      attachments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

const getLeadAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find({
      leadId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      attachments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInvoiceAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find({
      invoiceId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      attachments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);

    if (!attachment) {
      return res.status(404).json({
        success: false,
        message: "Attachment not found",
      });
    }

    if (attachment.publicId) {
      await cloudinary.uploader.destroy(attachment.publicId, {
        resource_type: "raw",
      });
    }

    await attachment.deleteOne();

    res.json({
      success: true,
      message: "Attachment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadLeadAttachment,

  uploadInvoiceAttachment,

  getAttachments,

  getLeadAttachments,

  getInvoiceAttachments,

  deleteAttachment,
};
