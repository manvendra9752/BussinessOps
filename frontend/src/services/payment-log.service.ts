import api from "./api";

import type { PaymentLog } from "@/types/payment-log";

interface PaymentLogsResponse {
  success: boolean;
  data: PaymentLog[];
}

export const getPaymentLogs = async (
  invoiceId: string,
): Promise<PaymentLog[]> => {
  const res = await api.get<PaymentLogsResponse>(`/payments/logs/${invoiceId}`);

  // axios: res.data = { success, data: logs[] } → res.data.data = logs[]
  return Array.isArray(res.data?.data) ? res.data.data : [];
};
