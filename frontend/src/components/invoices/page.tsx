"use client";

import { useState } from "react";

import Link from "next/link";

import { useInvoices } from "@/hooks/useInvoices";

import InvoiceTable from "@/components/invoices/invoice-table";

import InvoiceFilter from "@/components/invoices/invoice-filter";

export default function InvoicesPage() {
  const [status, setStatus] = useState("");

  const { data } = useInvoices({
    status,
  });

  return (
    <div className="space-y-6">
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >
            Invoices
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage, track and monitor all invoices.
          </p>
        </div>

        <Link
          href="/invoices/new"
          className="
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-2xl
            bg-gradient
            from-blue-600
            to-indigo-600
            hover:from-blue-700
            hover:to-indigo-700
            text-white
            font-semibold
            shadow-lg
            transition-all
            duration-200
            hover:scale-[1.02]
          "
        >
          + New Invoice
        </Link>
      </div>

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          shadow-sm
          p-6
        "
      >
        <div className="mb-4">
          <h2
            className="
              text-lg
              font-semibold
              text-gray-800
              mb-1
            "
          >
            Filter Invoices
          </h2>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Filter invoices by status.
          </p>
        </div>

        <InvoiceFilter status={status} setStatus={setStatus} />
      </div>

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            px-6
            py-5
            border-b
            bg-gradient
            from-slate-50
            to-gray-100
          "
        >
          <h2
            className="
              text-xl
              font-bold
              text-gray-900
            "
          >
            Invoice List
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Total Invoices:{" "}
            <span className="font-semibold">{data?.invoices?.length || 0}</span>
          </p>
        </div>

        <div className="p-6">
          <InvoiceTable invoices={data?.invoices || []} />
        </div>
      </div>
    </div>
  );
}
