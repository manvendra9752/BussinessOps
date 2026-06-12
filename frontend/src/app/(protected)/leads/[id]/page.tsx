"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { getUsers } from "@/services/user.service";
import toast from "react-hot-toast";
import { assignLead, getLead } from "@/services/lead.service";
import { getLeadFollowups } from "@/services/followup.service";
import { getLeadAttachments } from "@/services/attachment.service";

import FollowupList from "@/components/followups/followup-list";
import CreateFollowupForm from "@/components/followups/create-followup-form";

import UploadAttachment from "@/components/leads/upload-attachment";
import AttachmentList from "@/components/attachments/attachment-list";
import Loader from "@/components/ui/loader";

export default function LeadDetail() {
  const params = useParams();
  const id = params.id as string;

  const [lead, setLead] = useState<any>(null);
  const [followups, setFollowups] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const loadLead = async () => {
    const res = await getLead(id);
    setLead(res.data.lead);
  };

  const loadFollowups = async () => {
    const res = await getLeadFollowups(id);
    setFollowups(res.data.followups);
  };

  const loadAttachments = async () => {
    const res = await getLeadAttachments(id);
    setAttachments(res.data.attachments);
  };
  const handleAssign = async () => {
    if (!selectedAgent) {
      return toast.error("Please select an agent");
    }

    try {
      await assignLead(id, selectedAgent);

      toast.success("Lead assigned successfully");

      loadLead();
    } catch (error) {
      toast.error("Failed to assign lead");
    }
  };
  useEffect(() => {
    getUsers().then((res) => {
      const users = res.data.data || [];

      console.log("Users =>", users);

      setAgents(users.filter((u: any) => u.role === "AGENT" && u.isActive));
    });
  }, []);
  useEffect(() => {
    if (!id) return;

    loadLead();
    loadFollowups();
    loadAttachments();
  }, [id]);

  if (!lead) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Lead Header */}
      <div
        className="
    relative
    overflow-hidden
    rounded-3xl
    bg-linear-to-r
    from-blue-600
    via-indigo-600
    to-violet-600
    p-8
    text-white
    shadow-xl
  "
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="
          h-20
          w-20
          rounded-full
          bg-white/20
          backdrop-blur
          flex
          items-center
          justify-center
          text-3xl
          font-bold
        "
            >
              {lead.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{lead.name}</h1>

              <p className="text-blue-100 text-lg">
                {lead.company || "No Company"}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span
                  className="
              px-4
              py-2
              rounded-full
              bg-white/20
              backdrop-blur
              text-sm
              font-semibold
            "
                >
                  {lead.status}
                </span>

                {lead.assignedTo && (
                  <span
                    className="
                px-4
                py-2
                rounded-full
                bg-green-500/30
                text-sm
                font-semibold
              "
                  >
                    Assigned: {lead.assignedTo.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/leads/${id}/edit`}
            className="
        px-6
        py-3
        rounded-xl
        bg-white
        text-blue-700
        font-semibold
        shadow-lg
        hover:scale-105
        transition
      "
          >
            Edit Lead
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Status</p>

          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {lead.status}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Followups</p>

          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            {followups.length}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Attachments</p>

          <h3 className="text-2xl font-bold text-indigo-600 mt-2">
            {attachments.length}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div
        className="
      grid
      lg:grid-cols-2
      gap-6"
      >
        <div
          className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        p-6"
        >
          <h2
            className="
          text-lg
          font-semibold
          mb-5"
          >
            Contact Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="font-medium text-gray-900">{lead.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>

              <p className="font-medium text-gray-900">{lead.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Company</p>

              <p className="font-medium text-gray-900">{lead.company}</p>
            </div>
          </div>
        </div>

        <div
          className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        p-6"
        >
          <h2
            className="
          text-lg
          font-semibold
          mb-5"
          >
            Notes
          </h2>

          <p
            className="
          text-gray-700
          leading-7"
          >
            {lead.notes || "No notes available"}
          </p>
        </div>
      </div>

      {/* Assigned Agent */}
      <div
        className="
    bg-white
    rounded-3xl
    border
    border-gray-200
    shadow-sm
    p-8
  "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Lead Assignment</h2>

          <p className="text-gray-500">Assign or transfer this lead</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="
        flex-1
        px-4
        py-3
        rounded-2xl
        border
        border-gray-300
        focus:ring-4
        focus:ring-blue-100
        focus:border-blue-500
        outline-none
      "
          >
            <option value="">Select Agent</option>

            {agents.map((agent: any) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            className="
        px-8
        py-3
        rounded-2xl
        bg-linear-to-r
        from-blue-600
        to-indigo-600
        text-white
        font-semibold
        shadow-lg
        hover:scale-105
        transition
      "
          >
            Assign Lead
          </button>
        </div>
      </div>

      {/* ================= FOLLOWUPS ================= */}
      <div
        className="
    bg-white
    rounded-3xl
    border
    border-gray-200
    shadow-sm
    overflow-hidden
  "
      >
        <div
          className="
      px-8
      py-6
      border-b
       bg-linear-to-r
      from-blue-50
      to-indigo-50
    "
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
              h-12
              w-12
              rounded-2xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-xl
            "
                >
                  📞
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Followups
                  </h2>

                  <p className="text-gray-500">
                    Track calls, meetings and customer interactions
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
          flex
          items-center
          gap-2
          bg-white
          px-4
          py-2
          rounded-2xl
          border
          shadow-sm
        "
            >
              <span className="text-2xl font-bold text-blue-600">
                {followups.length}
              </span>

              <span className="text-sm text-gray-500">Followup Records</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div
            className="
        bg-gray-50
        rounded-2xl
        border
        border-dashed
        border-gray-300
        p-6
        mb-8
      "
          >
            <h3
              className="
          text-lg
          font-semibold
          text-gray-900
          mb-2
        "
            >
              Add New Followup
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              Record your latest communication with this lead.
            </p>

            <CreateFollowupForm leadId={id} refresh={loadFollowups} />
          </div>

          <FollowupList followups={followups} />
        </div>
      </div>

      {/* ================= ATTACHMENTS ================= */}
      <div
        className="
    bg-white
    rounded-3xl
    border
    border-gray-200
    shadow-sm
    overflow-hidden
  "
      >
        <div
          className="
      px-8
      py-6
      border-b
      bg-linear-to-r
      from-indigo-50
      to-purple-50
    "
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="
            h-12
            w-12
            rounded-2xl
            bg-indigo-600
            text-white
            flex
            items-center
            justify-center
            text-xl
          "
              >
                📎
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Attachments
                </h2>

                <p className="text-gray-500">
                  Store contracts, documents and supporting files
                </p>
              </div>
            </div>

            <div
              className="
          bg-white
          border
          rounded-2xl
          px-4
          py-2
          shadow-sm
          flex
          items-center
          gap-2
        "
            >
              <span className="text-2xl font-bold text-indigo-600">
                {attachments.length}
              </span>

              <span className="text-sm text-gray-500">Uploaded Files</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Upload Area */}
          <div
            className="
        mb-8
        rounded-3xl
        border-2
        border-dashed
        border-indigo-300
        bg-indigo-50/40
        p-8
        text-center
      "
          >
            <div className="text-5xl mb-4">☁️</div>

            <h3
              className="
          text-lg
          font-semibold
          text-gray-900
          mb-2
        "
            >
              Upload New Attachment
            </h3>

            <p
              className="
          text-sm
          text-gray-500
          mb-6
        "
            >
              Drag & drop files or browse from your device. Supports PDF, DOCX,
              JPG, PNG and more.
            </p>

            <div className="max-w-md mx-auto">
              <UploadAttachment leadId={id} onSuccess={loadAttachments} />
            </div>
          </div>

          {/* Files List */}
          <div>
            <AttachmentList
              attachments={attachments}
              refresh={loadAttachments}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
