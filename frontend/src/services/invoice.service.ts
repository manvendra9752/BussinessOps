import api from "./api";

export const getInvoices = (params?: any) =>
  api.get("/invoices", {
    params,
  });

export const getInvoice = (id: string) => api.get(`/invoices/${id}`);

export const createInvoice = (data: any) => api.post("/invoices", data);

export const updateInvoiceStatus = (id: string, status: string) =>
  api.put(`/invoices/${id}/status`, { status });

export const sendInvoice = (id: string) => api.post(`/invoices/${id}/send`);
