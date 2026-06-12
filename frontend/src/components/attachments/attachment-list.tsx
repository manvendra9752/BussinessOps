import { Trash2, Eye } from "lucide-react";
import { deleteAttachment } from "@/services/attachment.service";
import toast from "react-hot-toast";

const handleDownload = async (url: string, fileName: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    toast.error("Download failed");
  }
};

export default function AttachmentList({
  attachments,
  refresh,
}: {
  attachments: any[];
  refresh: () => void;
}) {
  if (!attachments.length) {
    return (
      <div
        className="
          text-center
          py-12
          border
          border-dashed
          rounded-3xl
          bg-gray-50
        "
      >
        <div className="text-5xl mb-3">📎</div>

        <h3 className="text-lg font-semibold text-gray-700">No Attachments</h3>

        <p className="text-gray-500 mt-1">Upload files to see them here.</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAttachment(id);

      toast.success("Attachment deleted");

      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <div
          key={attachment._id}
          className="
            flex
            items-center
            justify-between
            p-5
            rounded-2xl
            border
            border-gray-200
            bg-white
            hover:shadow-md
            transition-all
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-indigo-100
                text-indigo-600
                flex
                items-center
                justify-center
                text-xl
              "
            >
              📄
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                {attachment.fileName}
              </h4>

              <p className="text-sm text-gray-500">
                {(attachment.fileSize / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                handleDownload(attachment.fileUrl, attachment.fileName)
              }
              className="
    inline-flex
    items-center
    gap-2
    px-4
    py-2
    rounded-xl
    bg-green-600
    text-white
  "
            >
              Download
            </button>

            <button
              onClick={() => handleDelete(attachment._id)}
              className="
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-xl
                bg-red-100
                text-red-600
                hover:bg-red-200
                transition
              "
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
