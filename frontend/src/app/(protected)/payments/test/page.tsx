"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import RoleGuard from "@/components/auth/role-guard";

function WebhookTestContent() {
  const [invoiceId, setInvoiceId] = useState("");
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("SUCCESS");
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    if (!invoiceId || !secret) {
      return toast.error("Please fill in all fields");
    }
    try {
      setLoading(true);
      await api.post(
        "/payments/mock-webhook",
        {
          invoiceId,
          paymentStatus: status,
          transactionId: "TXN_" + Date.now(),
        },
        {
          headers: { "x-webhook-secret": secret },
        },
      );
      toast.success("Webhook processed successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Webhook failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Mock Payment Webhook
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Simulate a payment gateway webhook callback
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Invoice ID
          </label>
          <input
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            placeholder="Enter invoice MongoDB ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Webhook Secret
          </label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter webhook secret"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Payment Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        <button
          onClick={trigger}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Trigger Webhook"}
        </button>
      </div>
    </div>
  );
}

export default function PaymentWebhookTestPage() {
  return (
    <RoleGuard roles={["ADMIN", "FINANCE"]}>
      <WebhookTestContent />
    </RoleGuard>
  );
}
