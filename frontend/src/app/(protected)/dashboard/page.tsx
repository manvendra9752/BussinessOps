"use client";

import { useDashboard } from "@/hooks/useDashboard";
import StatCard from "@/components/dashboard/stat-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import Loader from "@/components/ui/loader";
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Receipt,
  CreditCard,
  Clock,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your business operations
        </p>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Leads"
          value={data?.totalLeads ?? 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Open Leads"
          value={data?.openLeads ?? 0}
          icon={TrendingUp}
          color="orange"
        />
        <StatCard
          title="Converted"
          value={data?.convertedLeads ?? 0}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Lost"
          value={data?.lostLeads ?? 0}
          icon={UserX}
          color="red"
        />
        <StatCard
          title="Due Today"
          value={data?.dueToday ?? 0}
          icon={AlertCircle}
          color="yellow"
        />
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Invoices"
          value={data?.totalInvoices ?? 0}
          icon={Receipt}
          color="indigo"
        />
        <StatCard
          title="Paid Invoices"
          value={data?.paidInvoices ?? 0}
          icon={CreditCard}
          color="green"
        />
        <StatCard
          title="Unpaid Invoices"
          value={data?.unpaidInvoices ?? 0}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(data?.totalRevenue ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={data?.recentActivity || []} />
    </div>
  );
}
