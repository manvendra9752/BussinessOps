export interface PaymentLog {
  _id: string;
  invoiceId: string;
  status: string;
  payload?: {
    amount?: number;
    transactionId?: string;
  };
  provider?: string;
  createdAt: string;
}
