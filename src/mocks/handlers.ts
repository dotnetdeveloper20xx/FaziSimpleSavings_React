
import { rest } from "msw";

export const handlers = [
  // Register
  rest.post("/api/auth/register", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "User registered successfully",
        data: "mock-jwt-token",
        statusCode: 200,
        errors: null,
      })
    );
  }),

  // Login
  rest.post("/api/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "User logged in successfully",
        data: "mock-jwt-token",
        statusCode: 200,
        errors: null,
      })
    );
  }),

  // Fetch Goals
  rest.get("/api/savingsgoals", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "User goals retrieved",
        data: [
          {
            id: "goal-123",
            name: "Vacation",
            currentAmount: 250,
            targetAmount: 1000,
          },
        ],
        statusCode: 200,
        errors: null,
      })
    );
  }),

  // Create Goal
  rest.post("/api/savingsgoals", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "Goal created successfully",
        data: "goal-456",
        statusCode: 200,
        errors: null,
      })
    );
  }),
];
