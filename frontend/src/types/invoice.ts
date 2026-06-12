export interface InvoiceItem {
  _id?: string;

  description: string;

  quantity: number;

  unitPrice: number;

  lineTotal?: number;
}

export interface Invoice {
  _id: string;

  invoiceNumber: string;

  status: "DRAFT" | "SENT" | "PAID" | "CANCELLED";

  subtotal: number;

  taxAmount: number;

  totalAmount: number;

  discount: number;

  createdAt: string;
}
