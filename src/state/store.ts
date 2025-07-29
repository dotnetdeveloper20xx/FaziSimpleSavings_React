import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import goalsReducer from "./goalsSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
