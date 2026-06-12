"use client";

import { useEffect, useState } from "react";

import { getAuditLogs } from "@/services/audit.service";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditLogs()
      .then((res) => setLogs(res.data.data || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  const getActionColor = (action: string) => {
    if (action.includes("CREATE"))
      return "bg-green-100 text-green-700 border-green-200";

    if (action.includes("UPDATE"))
      return "bg-blue-100 text-blue-700 border-blue-200";

    if (action.includes("DELETE"))
      return "bg-red-100 text-red-700 border-red-200";

    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Audit Logs</h1>

        <p className="text-gray-500 mt-2">
          Track all activities and actions performed in the system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Logs</p>

          <h2 className="text-3xl font-bold mt-2">{logs.length}</h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Active Users</p>

          <h2 className="text-3xl font-bold mt-2">
            {new Set(logs.map((log) => log.actorUserId?._id)).size}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Latest Activity</p>

          <h2 className="text-lg font-semibold mt-2 truncate">
            {logs[0]?.action || "N/A"}
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {logs.length === 0 ? (
        <div className="bg-white border rounded-3xl shadow-sm p-16 text-center">
          <div className="text-6xl mb-4">📋</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Audit Logs Found
          </h2>

          <p className="text-gray-500">System activities will appear here.</p>
        </div>
      ) : (
        <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b bg-gray-50">
            <h2 className="text-xl font-semibold">Activity History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Entity
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={log._id}
                    className={`
                      hover:bg-gray-50
                      transition
                      ${index !== logs.length - 1 ? "border-b" : ""}
                    `}
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`
                          px-3
                          py-1.5
                          rounded-full
                          border
                          text-xs
                          font-semibold
                          ${getActionColor(log.action)}
                        `}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {log.entityType}
                        </p>

                        {log.entityId && (
                          <p className="text-xs text-gray-500 mt-1">
                            {log.entityId}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {log.actorUserId?.name || "Unknown User"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {log.actorUserId?.email || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
