"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { getLead, updateLead } from "@/services/lead.service";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";

export default function EditLeadPage() {
  const params = useParams();

  const id = params.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    getLead(id).then((res) => setForm(res.data.lead));
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateLead(id, form);
      toast.success("Updated successfully");

      router.push(`/leads/${id}`);
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Edit Lead</h1>

        <p className="text-gray-500 mt-2">
          Update lead information, status and contact details.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Lead Info */}
        <div
          className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          shadow-sm
          p-8"
        >
          <h2 className="text-xl font-semibold mb-6">Lead Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2"
              >
                Full Name
              </label>

              <input
                value={form.name || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none"
              />
            </div>

            <div>
              <label
                className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2"
              >
                Email
              </label>

              <input
                value={form.email || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none"
              />
            </div>

            <div>
              <label
                className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2"
              >
                Phone
              </label>

              <input
                value={form.phone || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none"
              />
            </div>

            <div>
              <label
                className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2"
              >
                Company
              </label>

              <input
                value={form.company || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div
          className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          shadow-sm
          p-8"
        >
          <h2 className="text-xl font-semibold mb-6">Lead Status</h2>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            focus:ring-2
            focus:ring-blue-500
            outline-none"
          >
            <option value="NEW">NEW</option>

            <option value="CONTACTED">CONTACTED</option>

            <option value="FOLLOW_UP">FOLLOW UP</option>

            <option value="CONVERTED">CONVERTED</option>

            <option value="LOST">LOST</option>
          </select>
        </div>

        {/* Notes */}
        <div
          className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          shadow-sm
          p-8"
        >
          <h2 className="text-xl font-semibold mb-6">Notes</h2>

          <textarea
            rows={5}
            value={form.notes || ""}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
            resize-none"
            placeholder="Add notes about this lead..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="
            px-5
            py-3
            border
            rounded-xl
            hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}
