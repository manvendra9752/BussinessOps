"use client";

import Link from "next/link";

import StatusBadge from "./status-badge";

export default function InvoiceTable({ invoices }: { invoices: any[] }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-linear-to-r
              from-slate-50
              to-gray-100
              border-b
            "
          >
            <tr>
              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Invoice No.
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Status
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Amount
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Created Date
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="
                    border-b
                    last:border-b-0
                    hover:bg-blue-50/50
                    transition-colors
                  "
                >
                  <td className="px-6 py-5">
                    <div>
                      <p
                        className="
                          font-semibold
                          text-gray-900
                          font-mono
                        "
                      >
                        {invoice.invoiceNumber}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        ID: {invoice._id.slice(-6)}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={invoice.status} />
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className="
                        text-lg
                        font-bold
                        text-green-600
                      "
                    >
                      ₹{Number(invoice.totalAmount).toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-gray-700
                    "
                  >
                    {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                    "
                  >
                    <Link
                      href={`/invoices/${invoice._id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-sm
                        font-medium
                        transition-all
                      "
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="
                    py-16
                    text-center
                  "
                >
                  <div className="space-y-3">
                    <div className="text-5xl">📄</div>

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-gray-700
                      "
                    >
                      No Invoices Found
                    </h3>

                    <p className="text-gray-500">
                      Create your first invoice to get started.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
