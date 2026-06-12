interface Props {
  followups: any[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-orange-100 text-orange-700";
  }
};

export default function FollowupList({ followups }: Props) {
  if (!followups?.length) {
    return (
      <p className="text-sm text-gray-500 text-center py-6">
        No follow-ups yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {followups.map((item) => (
        <div
          key={item._id}
          className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <div className="flex-shrink-0 mt-1">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 font-medium">{item.message}</p>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadge(item.status)}`}
              >
                {item.status}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(item.followUpDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
