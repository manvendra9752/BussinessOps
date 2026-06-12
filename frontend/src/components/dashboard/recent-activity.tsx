interface Props {
  activities: any[];
}

const getActionBadge = (action: string) => {
  if (action.includes("CREATE") || action.includes("CREATED"))
    return "bg-green-100 text-green-700";
  if (action.includes("UPDATE") || action.includes("SENT"))
    return "bg-blue-100 text-blue-700";
  if (action.includes("DELETE") || action.includes("DEACTIVAT"))
    return "bg-red-100 text-red-700";
  if (action.includes("PAYMENT") || action.includes("PAID"))
    return "bg-purple-100 text-purple-700";
  if (action.includes("LOGIN") || action.includes("AUTH"))
    return "bg-orange-100 text-orange-700";
  if (action.includes("ASSIGN")) return "bg-indigo-100 text-indigo-700";
  return "bg-gray-100 text-gray-700";
};

export default function RecentActivity({ activities }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-500">Latest system actions</p>
      </div>

      <div className="p-4">
        {!activities?.length ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No recent activity
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((item: any, index: number) => (
              <div
                key={item._id || index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getActionBadge(item.action)}`}
                    >
                      {item.action}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.entityType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.actorUserId?.name || "System"} &middot;{" "}
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
