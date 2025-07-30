import goalsReducer, { createGoal, fetchGoals } from "./goalsSlice";

describe("goals reducer", () => {
  it("should handle initial state", () => {
    const initialState = goalsReducer(undefined, { type: "@@INIT" });
    expect(initialState.goals).toEqual([]);
  });
});
