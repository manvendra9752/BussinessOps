"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";
import InvoiceTable from "@/components/invoices/invoice-table";
import InvoiceFilter from "@/components/invoices/invoice-filter";
import { useAuth } from "@/hooks/useAuth";

export default function InvoicesPage() {
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const { data, isLoading } = useInvoices({ status });

  const canCreate =
    user?.role === "ADMIN" ||
    user?.role === "MANAGER" ||
    user?.role === "FINANCE";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data?.total ?? 0} total invoices
          </p>
        </div>

        {canCreate && (
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            New Invoice
          </Link>
        )}
      </div>

      <InvoiceFilter status={status} setStatus={setStatus} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <InvoiceTable invoices={data?.invoices || []} />
      )}
    </div>
  );
}
