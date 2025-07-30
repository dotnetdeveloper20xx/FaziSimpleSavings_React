import { render, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice";
import goalsReducer from "../state/goalsSlice";
import notificationsReducer from "../state/notificationsSlice";

// ✅ Match full absolute API URL (real request origin)
const server = setupServer(
  rest.get("https://localhost:7000/api/savingsgoals", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: "1",
            name: "Vacation",
            currentAmount: 250,
            targetAmount: 1000,
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = () => {
  const testStore = configureStore({
    reducer: {
      auth: authReducer,
      goals: goalsReducer,
      notifications: notificationsReducer,
    },
  });

  return render(
    <Provider store={testStore}>
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    </Provider>
  );
};

describe("DashboardPage", () => {
  it("fetches and displays goals", async () => {
    renderWithProviders();

    expect(screen.getByText(/Loading goals/i)).toBeInTheDocument();

    expect(await screen.findByText("Vacation")).toBeInTheDocument();
    expect(await screen.findByText(/£250.00 of £1000.00/)).toBeInTheDocument();
  });

  it("shows empty state when there are no goals", async () => {
    server.use(
      rest.get("https://localhost:7000/api/savingsgoals", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            data: [],
          })
        );
      })
    );

    renderWithProviders();

    expect(
      await screen.findByText(/You haven’t created any goals yet/i)
    ).toBeInTheDocument();
  });
});
