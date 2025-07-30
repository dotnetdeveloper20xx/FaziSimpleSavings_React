import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state/authSlice";
import goalsReducer from "./state/goalsSlice";
import notificationsReducer from "./state/notificationsSlice";

const testStore = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    notifications: notificationsReducer,
  },
});

test("renders landing page with login/register buttons", () => {
  render(
    <Provider store={testStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  // Look for more reliable text than "welcome to FaziSimpleSavings"
  expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
});
