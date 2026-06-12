"use client";

interface Props {
  due: string;
  setDue: (value: string) => void;
}

export default function FollowupFilter({ due, setDue }: Props) {
  const options = [
    { value: "", label: "All Follow-ups" },
    { value: "today", label: "Due Today" },
    { value: "overdue", label: "Overdue" },
    { value: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setDue(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            due === opt.value
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
