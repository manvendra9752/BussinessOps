"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadLeadFile } from "@/services/upload.service";
import toast from "react-hot-toast";

export default function UploadAttachment({
  leadId,
  onSuccess,
}: {
  leadId: string;
  onSuccess?: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  const upload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowed.includes(file.type)) {
      return toast.error("Only PDF, PNG, JPG files are allowed");
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size must be under 2 MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      await uploadLeadFile(leadId, formData);
      toast.success("File uploaded successfully");
      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition inline-flex">
      <Upload size={16} />
      {uploading ? "Uploading..." : "Choose File"}
      <input type="file" onChange={upload} className="hidden" disabled={uploading} accept=".pdf,.png,.jpg,.jpeg" />
    </label>
  );
}
