import api from "./api";

export const loginUser = (data: any) => api.post("/auth/login", data);

export const registerUser = (data: any) => api.post("/auth/register", data);
export const me = () => api.get("/auth/me");

export const logout = () => api.post("/auth/logout");
