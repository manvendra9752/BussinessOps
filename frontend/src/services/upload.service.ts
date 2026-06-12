import api from "./api";

export const uploadLeadFile = (leadId: string, formData: FormData) =>
  api.post(`/uploads/lead/${leadId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
