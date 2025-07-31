import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {
  fetchMyGroupGoals,
  createGroupGoal,
  fetchGroupGoalById,
  contributeToGroupGoal,
  fetchGroupGoalTransactions,
  fetchAvailableUsers,
  addMemberToGroupGoal,
} from "../core/services/groupGoalsService";


interface User {
  id: string;
  email: string;
  fullName: string;
}


// --- Types ---
interface GroupGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

interface GroupGoalsState {
  goals: GroupGoal[];
  selectedGoal: GroupGoal | null;
  transactions: Transaction[];
  availableUsers: User[];
  loading: boolean;
  error: string | null;
}

interface Transaction {
  transactionId: string;
  amount: number;
  date: string;
}


const initialState: GroupGoalsState = {
  goals: [],
  selectedGoal: null,
  transactions: [],
  availableUsers: [],
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

export const getGroupGoalById = createAsyncThunk<
  GroupGoal,
  string,
  { rejectValue: string }
>("groupGoals/getById", async (id, thunkAPI) => {
  try {
    const response = await fetchGroupGoalById(id);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load group goal"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const contributeToGroupGoalThunk = createAsyncThunk<
  void,
  { id: string; amount: number },
  { rejectValue: string }
>("groupGoals/contribute", async ({ id, amount }, thunkAPI) => {
  try {
    await contributeToGroupGoal(id,  amount);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to contribute"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const getGroupGoalTransactions = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>("groupGoals/getTransactions", async (id, thunkAPI) => {
  try {
    const response = await fetchGroupGoalTransactions(id);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load transactions"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const getAvailableUsers = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("groupGoals/getAvailableUsers", async (goalId, thunkAPI) => {
  try {
    const response = await fetchAvailableUsers(goalId);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load users"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const addUserToGroup = createAsyncThunk<
  void,
  { goalId: string; userId: string },
  { rejectValue: string }
>("groupGoals/addUser", async ({ goalId, userId }, thunkAPI) => {
  try {
    await addMemberToGroupGoal(goalId,  userId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to invite user"
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
      )
      // Get Goal By ID
      .addCase(getGroupGoalById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedGoal = null;
      })
      .addCase(
        getGroupGoalById.fulfilled,
        (state, action: PayloadAction<GroupGoal>) => {
          state.loading = false;
          state.selectedGoal = action.payload;
        }
      )
      .addCase(
        getGroupGoalById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch group goal";
        }
      )
      .addCase(contributeToGroupGoalThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contributeToGroupGoalThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        contributeToGroupGoalThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to contribute";
        }
      )
      .addCase(getGroupGoalTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getGroupGoalTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(
        getGroupGoalTransactions.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch transactions";
        }
      )
      .addCase(
        getAvailableUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.availableUsers = action.payload;
        }
      )
      .addCase(
        getAvailableUsers.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Failed to fetch available users";
        }
      )
      .addCase(
        addUserToGroup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Failed to add member";
        }
      );


  },
});

export default groupGoalsSlice.reducer;
