import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../core/apiClient";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  goals: [],
  loading: false,
  error: null,
};

// 🔁 Fetch all savings goals
export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/api/savingsgoals");
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch goals"
      );
    }
  }
);

// ➕ Create a new savings goal
export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (
    { name, targetAmount }: { name: string; targetAmount: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.post("/api/savingsgoals", {
        name,
        targetAmount,
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create goal"
      );
    }
  }
);

export const depositToGoal = createAsyncThunk(
  "goals/depositToGoal",
  async (
    { goalId, amount }: { goalId: string; amount: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.post(`/api/savingsgoals/${goalId}/deposit`, {
        amount,
      });
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Deposit failed");
    }
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Goals
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Goal
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state) => {
        state.loading = false;
        // optionally refetch goals externally
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default goalsSlice.reducer;
