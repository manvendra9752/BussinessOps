"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useFollowups } from "@/hooks/useFollowups";

import { updateFollowup } from "@/services/followup.service";

import FollowupTable from "@/components/followups/followup-table";

import FollowupFilter from "@/components/followups/followup-filter";

export default function FollowupsPage() {
  const [due, setDue] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useFollowups({
    due,
  });

  const updateStatus = async (id: string, status: string) => {
    await updateFollowup(id, {
      status,
    });

    queryClient.invalidateQueries({
      queryKey: ["followups"],
    });
  };

  const followups = data?.followups || [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8"
      >
        <div>
          <h1
            className="
            text-4xl
            font-bold
            text-gray-900"
          >
            Followups
          </h1>

          <p
            className="
            text-gray-500
            mt-2"
          >
            Manage upcoming customer interactions and tasks.
          </p>
        </div>

        <div
          className="
          bg-blue-50
          border
          border-blue-200
          px-5
          py-3
          rounded-2xl"
        >
          <p
            className="
            text-sm
            text-blue-600"
          >
            Total Followups
          </p>

          <p
            className="
            text-2xl
            font-bold
            text-blue-700"
          >
            {followups.length}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mb-8"
      >
        <div
          className="
          bg-white
          border
          rounded-2xl
          shadow-sm
          p-5"
        >
          <p className="text-gray-500">Total</p>

          <h3
            className="
            text-3xl
            font-bold
            mt-2"
          >
            {followups.length}
          </h3>
        </div>

        <div
          className="
          bg-white
          border
          rounded-2xl
          shadow-sm
          p-5"
        >
          <p className="text-gray-500">Pending</p>

          <h3
            className="
            text-3xl
            font-bold
            text-orange-500
            mt-2"
          >
            {followups.filter((f: any) => f.status === "PENDING").length}
          </h3>
        </div>

        <div
          className="
          bg-white
          border
          rounded-2xl
          shadow-sm
          p-5"
        >
          <p className="text-gray-500">Completed</p>

          <h3
            className="
            text-3xl
            font-bold
            text-green-600
            mt-2"
          >
            {followups.filter((f: any) => f.status === "COMPLETED").length}
          </h3>
        </div>
      </div>

      {/* Filter Card */}
      <div
        className="
        bg-white
        border
        rounded-3xl
        shadow-sm
        p-6
        mb-6"
      >
        <div className="mb-4">
          <h2
            className="
            text-lg
            font-semibold
            text-gray-900"
          >
            Filters
          </h2>

          <p className="text-gray-500 text-sm">
            Filter followups by due date and status.
          </p>
        </div>

        <FollowupFilter due={due} setDue={setDue} />
      </div>

      {/* Table Card */}
      <div
        className="
        bg-white
        border
        rounded-3xl
        shadow-sm
        overflow-hidden"
      >
        <div
          className="
          px-6
          py-5
          border-b
          bg-gray-50"
        >
          <h2
            className="
            text-lg
            font-semibold"
          >
            Followup Records
          </h2>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div
              className="
              flex
              justify-center
              items-center
              py-20"
            >
              <div
                className="
                h-10
                w-10
                border-4
                border-blue-500
                border-t-transparent
                rounded-full
                animate-spin"
              />
            </div>
          ) : (
            <FollowupTable
              followups={followups}
              onStatusChange={updateStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
