import api from "./api";

export const createPayment = (invoiceId: string) =>
  api.post("/payments/mock-create", {
    invoiceId,
  });
