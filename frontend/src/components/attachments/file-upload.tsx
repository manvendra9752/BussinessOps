"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { uploadLeadFile } from "@/services/upload.service";

interface Props {
  leadId?: string;
  invoiceId?: string;
  onSuccess: () => void;
}

export default function FileUpload({ leadId, onSuccess }: Props) {
  const [uploading, setUploading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2 MB");
      return;
    }

    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, PNG, JPG files are allowed");
      return;
    }

    if (!leadId) {
      toast.error("No lead selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      await uploadLeadFile(leadId, formData);
      toast.success("File uploaded successfully");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
      <Upload size={16} />
      {uploading ? "Uploading..." : "Choose File"}
      <input
        type="file"
        onChange={upload}
        className="hidden"
        disabled={uploading}
        accept=".pdf,.png,.jpg,.jpeg"
      />
    </label>
  );
}
