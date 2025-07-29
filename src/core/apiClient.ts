import axios from "axios";
import { store } from "../state/store";

const apiClient = axios.create({
  baseURL: "https://localhost:7000", // 🔁 Update if your backend is hosted elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token may be expired.");
      // You can dispatch logout() here if needed
    }
    return Promise.reject(error);
  }
);

export default apiClient;
