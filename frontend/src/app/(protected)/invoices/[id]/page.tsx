"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { useInvoice } from "@/hooks/useInvoices";

import InvoiceItemsTable from "@/components/invoices/invoice-items-table";
import PaymentLogList from "@/components/invoices/payment-log-list";
import InvoiceActions from "@/components/invoices/invoice-actions";

import { getPaymentLogs } from "@/services/payment-log.service";

import { useAuth } from "@/hooks/useAuth";

export default function InvoiceDetail() {
  const params = useParams();

  const id = params.id as string;

  const { user } = useAuth();

  const { data } = useInvoice(id);

  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    getPaymentLogs(id)
      .then((logs) => setLogs(logs))
      .catch(() => setLogs([]));
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getStatusColor = () => {
    switch (data.status) {
      case "PAID":
        return "bg-green-100 text-green-700 border-green-200";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-3xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-sm text-gray-500 mb-2">Invoice Number</p>

            <h1 className="text-4xl font-bold text-gray-900">
              {data.invoiceNumber}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`
                px-4
                py-2
                rounded-full
                border
                text-sm
                font-semibold
                ${getStatusColor()}
              `}
            >
              {data.status}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border rounded-3xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Invoice Actions</h2>

        <InvoiceActions invoiceId={data._id} status={data.status} role={user?.role} />
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Subtotal</p>

          <h3 className="text-2xl font-bold mt-2">₹{data.subtotal}</h3>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Tax Amount</p>

          <h3 className="text-2xl font-bold mt-2 text-blue-600">
            ₹{data.taxAmount}
          </h3>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Discount</p>

          <h3 className="text-2xl font-bold mt-2 text-orange-600">
            ₹{data.discount}
          </h3>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-gray-500 text-sm">Total Amount</p>

          <h3 className="text-3xl font-bold mt-2 text-green-600">
            ₹{data.totalAmount}
          </h3>
        </div>
      </div>

      {/* Invoice Items */}
      {/* <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Invoice Items</h2>
        </div>

        <div className="p-6">
          <InvoiceItemsTable items={data.items} />
        </div>
      </div> */}
      <InvoiceItemsTable items={data.items} />

      {/* Payment Logs */}
      <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Payment History</h2>
        </div>

        <div className="p-6">
          {logs.length ? (
            <PaymentLogList logs={logs} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No payment logs available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
