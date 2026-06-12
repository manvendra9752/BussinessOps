import api from "./api";

export const getLeadAttachments = (leadId: string) =>
  api.get(`/uploads/lead/${leadId}`);

export const getInvoiceAttachments = (invoiceId: string) =>
  api.get(`/uploads/invoice/${invoiceId}`);

export const deleteAttachment = (id: string) =>
  api.delete(`/attachments/${id}`);
