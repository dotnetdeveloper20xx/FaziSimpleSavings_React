import apiClient from "../apiClient";

export const login = (email: string, password: string) => {
  return apiClient.post("/api/auth/login", { email, password });
};
