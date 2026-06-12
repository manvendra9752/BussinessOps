"use client";

import { useState } from "react";
import { sendInvoice, updateInvoiceStatus } from "@/services/invoice.service";
import { createPayment } from "@/services/payment.service";
import toast from "react-hot-toast";
import { Send, CreditCard, XCircle } from "lucide-react";
import ConfirmModal from "../ui/confirm-modal";

type ModalType = "send" | "cancel" | null;

export default function InvoiceActions({
  invoiceId,
  status,
  role,
}: {
  invoiceId: string;
  status?: string;
  role: string;
}) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    try {
      setLoading(true);
      await sendInvoice(invoiceId);
      toast.success("Invoice sent successfully");
      window.location.reload();
    } catch {
      toast.error("Failed to send invoice");
    } finally {
      setLoading(false);
      setActiveModal(null);
    }
  };

  const pay = async () => {
    try {
      await createPayment(invoiceId);
      toast.success("Mock payment initiated! Use webhook to mark as paid.");
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

  const cancel = async () => {
    try {
      setLoading(true);
      await updateInvoiceStatus(invoiceId, "CANCELLED");
      toast.success("Invoice cancelled");
      window.location.reload();
    } catch {
      toast.error("Failed to cancel invoice");
    } finally {
      setLoading(false);
      setActiveModal(null);
    }
  };

  const isPaid = status === "PAID";
  const isCancelled = status === "CANCELLED";

  if (isPaid || isCancelled) {
    return (
      <p className="text-sm text-gray-500">
        No actions available for {status?.toLowerCase()} invoices.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(role === "ADMIN" || role === "MANAGER" || role === "FINANCE") &&
          status !== "SENT" && (
            <button
              onClick={() => setActiveModal("send")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <Send size={14} />
              Send Invoice
            </button>
          )}

        {role === "FINANCE" && status === "SENT" && (
          <button
            onClick={pay}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <CreditCard size={14} />
            Initiate Payment
          </button>
        )}

        {(role === "ADMIN" || role === "FINANCE") && (
          <button
            onClick={() => setActiveModal("cancel")}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <XCircle size={14} />
            Cancel Invoice
          </button>
        )}
      </div>

      <ConfirmModal
        open={activeModal === "send"}
        onClose={() => setActiveModal(null)}
        onConfirm={send}
        title="Send Invoice"
        message="Send this invoice to the client? They will receive a notification."
        confirmText="Send Invoice"
        variant="info"
        loading={loading}
      />

      <ConfirmModal
        open={activeModal === "cancel"}
        onClose={() => setActiveModal(null)}
        onConfirm={cancel}
        title="Cancel Invoice"
        message="Cancel this invoice? This action cannot be undone."
        confirmText="Cancel Invoice"
        variant="danger"
        loading={loading}
      />
    </>
  );
}
