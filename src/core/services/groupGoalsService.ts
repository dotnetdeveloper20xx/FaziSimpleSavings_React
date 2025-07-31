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


// GET /api/group-goals/:id
export const fetchGroupGoalById = (id: string) => {
  return apiClient.get(`/api/group-goals/${id}`);
};

// POST /api/group-goals/:id/contribute
export const contributeToGroupGoal = (id: string, amount: number) => {
  return apiClient.post(`/api/group-goals/${id}/contribute`, amount);
};


// GET /api/group-goals/:id/transactions
export const fetchGroupGoalTransactions = (id: string) => {
  return apiClient.get(`/api/group-goals/${id}/transactions`);
};

// GET /api/group-goals/:id/available-users
export const fetchAvailableUsers = (id: string) => {
  return apiClient.get(`/api/group-goals/${id}/available-users`);
};

// POST /api/group-goals/:id/members
export const addMemberToGroupGoal = (
  id: string,
  userId: string
) => {
  return apiClient.post(`/api/group-goals/${id}/members`, userId);
};
