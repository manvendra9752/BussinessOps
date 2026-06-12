"use client";

interface Props {
  followups: any[];
  onStatusChange: (id: string, status: string) => void;
}

export default function FollowupTable({ followups, onStatusChange }: Props) {
  if (!followups?.length) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="text-5xl mb-4">📅</div>

        <h3 className="text-xl font-semibold text-gray-800">
          No Followups Found
        </h3>

        <p className="text-gray-500 mt-2">
          Followups will appear here once created.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            bg-green-100
            text-green-700"
          >
            Completed
          </span>
        );

      case "CANCELLED":
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            bg-red-100
            text-red-700"
          >
            Cancelled
          </span>
        );

      default:
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            bg-orange-100
            text-orange-700"
          >
            Pending
          </span>
        );
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-200
      shadow-sm
      overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              className="
              bg-gray-50
              border-b
              border-gray-200"
            >
              <th
                className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
                text-gray-700"
              >
                Lead
              </th>

              <th
                className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
                text-gray-700"
              >
                Message
              </th>

              <th
                className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
                text-gray-700"
              >
                Follow Up Date
              </th>

              <th
                className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
                text-gray-700"
              >
                Status
              </th>

              <th
                className="
                px-6
                py-4
                text-center
                text-sm
                font-semibold
                text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {followups.map((item) => (
              <tr
                key={item._id}
                className="
                border-b
                border-gray-100
                hover:bg-gray-50
                transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      h-10
                      w-10
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      font-bold
                      flex
                      items-center
                      justify-center"
                    >
                      {item.leadId?.name?.charAt(0)?.toUpperCase() || "L"}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.leadId?.name}
                      </p>

                      <p className="text-xs text-gray-500">Lead</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="text-gray-700 max-w-sm">{item.message}</p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-gray-100
                    text-gray-700
                    text-sm"
                  >
                    {new Date(item.followUpDate).toLocaleDateString()}
                  </span>
                </td>

                <td className="px-6 py-4">{getStatusBadge(item.status)}</td>

                <td className="px-6 py-4">
                  {item.status === "PENDING" && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onStatusChange(item._id, "COMPLETED")}
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        text-sm
                        font-medium
                        transition"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => onStatusChange(item._id, "CANCELLED")}
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        text-sm
                        font-medium
                        transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {item.status !== "PENDING" && (
                    <span className="text-gray-400 text-sm">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
