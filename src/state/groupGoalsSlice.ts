import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMyGroupGoals,
  createGroupGoal,
} from "../core/services/groupGoalsService";
import axios from "axios";

// --- Types ---
interface GroupGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

interface GroupGoalsState {
  goals: GroupGoal[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupGoalsState = {
  goals: [],
  loading: false,
  error: null,
};

// --- Thunks ---

export const getMyGroupGoals = createAsyncThunk<
  GroupGoal[],
  void,
  { rejectValue: string }
>("groupGoals/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await fetchMyGroupGoals();
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const createNewGroupGoal = createAsyncThunk<
  void,
  { name: string; targetAmount: number },
  { rejectValue: string }
>("groupGoals/create", async (payload, thunkAPI) => {
  try {
    await createGroupGoal(payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create goal"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

// --- Slice ---

const groupGoalsSlice = createSlice({
  name: "groupGoals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch My Goals
      .addCase(getMyGroupGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMyGroupGoals.fulfilled,
        (state, action: PayloadAction<GroupGoal[]>) => {
          state.loading = false;
          state.goals = action.payload;
        }
      )
      .addCase(
        getMyGroupGoals.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Something went wrong";
        }
      )

      // Create New Goal
      .addCase(createNewGroupGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewGroupGoal.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        createNewGroupGoal.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Create failed";
        }
      );
  },
});

export default groupGoalsSlice.reducer;
