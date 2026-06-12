import api from "./api";

export const getLeads = (params?: any) => api.get("/leads", { params });

export const getLeadById = (id: string) => api.get(`/leads/${id}`);

export const getLead = getLeadById;

export const createLead = (data: any) => api.post("/leads", data);

export const updateLead = (id: string, data: any) =>
  api.put(`/leads/${id}`, data);

export const deleteLead = (id: string) => api.delete(`/leads/${id}`);

export const assignLead = (id: string, assignedTo: string) =>
  api.patch(`/leads/${id}/assign`, {
    assignedTo,
  });
