import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateGoalModal from "./CreateGoalModal";

describe("CreateGoalModal", () => {
  const onCreate = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    onCreate.mockClear();
    onClose.mockClear();
  });

  it("shows validation errors when form is empty", async () => {
    render(
      <CreateGoalModal isOpen={true} onClose={onClose} onCreate={onCreate} />
    );

    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(
      await screen.findByText(/please enter a goal name/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/target amount must be greater than 0/i)
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(
      <CreateGoalModal isOpen={true} onClose={onClose} onCreate={onCreate} />
    );

    await userEvent.type(screen.getByLabelText(/goal name/i), "New Car");
    await userEvent.type(screen.getByLabelText(/target amount/i), "1500");

    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(onCreate).toHaveBeenCalledWith({
      name: "New Car",
      targetAmount: 1500,
    });
  });
});
