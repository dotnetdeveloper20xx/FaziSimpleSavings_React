import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../core/apiClient";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      const token = response.data.data;
      localStorage.setItem("token", token);

      return token;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.token = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem("token", action.payload);
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
