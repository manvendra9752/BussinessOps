"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createFollowup } from "@/services/followup.service";

export default function CreateFollowupForm({
  leadId,
  refresh,
}: {
  leadId: string;
  refresh: () => void;
}) {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !date) {
      return toast.error("Please fill in all fields");
    }
    try {
      setLoading(true);
      await createFollowup(leadId, { message, followUpDate: date });
      toast.success("Follow-up added");
      setMessage("");
      setDate("");
      refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add follow-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        placeholder="Follow-up message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
