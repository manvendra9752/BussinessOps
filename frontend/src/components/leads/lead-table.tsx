"use client";

import Link from "next/link";

const getStatusColor = (status: string) => {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-700";
    case "CONTACTED":
      return "bg-purple-100 text-purple-700";
    case "FOLLOW_UP":
      return "bg-yellow-100 text-yellow-700";
    case "CONVERTED":
      return "bg-green-100 text-green-700";
    case "LOST":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ");
};

export default function LeadTable({ leads }: { leads: any[] }) {
  if (!leads?.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="text-4xl mb-3">📋</div>
        <h3 className="text-lg font-semibold text-gray-700">No Leads Found</h3>
        <p className="text-gray-500 mt-1 text-sm">
          Create a lead to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-600 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-semibold">Lead</th>
              <th className="px-6 py-3 text-left font-semibold">Company</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Assigned To</th>
              <th className="px-6 py-3 text-left font-semibold">Source</th>
              <th className="px-6 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {lead.name}
                    </p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {lead.company || "-"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}
                  >
                    {formatStatus(lead.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {lead.assignedTo?.name || (
                    <span className="text-gray-400">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {lead.source || "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/leads/${lead._id}`}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
