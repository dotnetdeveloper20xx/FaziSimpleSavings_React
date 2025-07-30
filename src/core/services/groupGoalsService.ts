import apiClient from "../apiClient";


// GET /api/group-goals
export const fetchMyGroupGoals = () => {
  return apiClient.get("/api/group-goals");
};

// POST /api/group-goals
export const createGroupGoal = (payload: {
  name: string;
  targetAmount: number;
}) => {
  return apiClient.post("/api/group-goals", payload);
};
