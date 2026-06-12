import api from "./api";

export const getFollowups = (params?: any) =>
  api.get("/followups", {
    params,
  });

export const getLeadFollowups = (leadId: string) =>
  api.get(`/leads/${leadId}/followups`);

export const createFollowup = (leadId: string, data: any) =>
  api.post(`/leads/${leadId}/followups`, data);

export const updateFollowup = (id: string, data: any) =>
  api.put(`/followups/${id}`, data);
