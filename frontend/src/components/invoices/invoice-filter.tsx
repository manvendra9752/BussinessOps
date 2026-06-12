"use client";

export default function InvoiceFilter({ status, setStatus }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
      >
        <option value="">All Status</option>
        <option value="DRAFT">Draft</option>
        <option value="SENT">Sent</option>
        <option value="PAID">Paid</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
}
