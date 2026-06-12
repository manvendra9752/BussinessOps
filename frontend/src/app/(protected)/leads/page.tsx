"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import LeadTable from "@/components/leads/lead-table";
import LeadFilters from "@/components/leads/lead-filters";
import { useLeads } from "@/hooks/useLeads";
import { useAuth } from "@/hooks/useAuth";

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const { data, isLoading } = useLeads({
    page,
    limit: 10,
    search,
    status,
    sort,
  });

  const totalPages = data?.totalPages || 1;
  const canCreate =
    user?.role === "ADMIN" || user?.role === "MANAGER";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data?.total ?? 0} total leads
          </p>
        </div>

        {canCreate && (
          <Link
            href="/leads/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            New Lead
          </Link>
        )}
      </div>

      <LeadFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        status={status}
        setStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        sort={sort}
        setSort={setSort}
      />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <LeadTable leads={data?.leads || []} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 bg-white rounded-xl border border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages} ({data?.total} results)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
