import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../core/apiClient";

interface Notification {
  id: string;
  message: string;
  notificationDate: string;
  isRead: boolean;
}

interface NotificationState {
  items: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
};

// 🔁 Get all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/api/notifications");
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load notifications"
      );
    }
  }
);

// ✅ Mark as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.post(`/api/notifications/${id}/mark-as-read`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark as read"
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notification = state.items.find((n) => n.id === id);
        if (notification) notification.isRead = true;
      });
  },
});

export default notificationsSlice.reducer;
