import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import goalsReducer from "./goalsSlice";
import notificationsReducer from "./notificationsSlice";
import groupGoalsReducer from "./groupGoalsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    notifications: notificationsReducer,
    groupGoals: groupGoalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
