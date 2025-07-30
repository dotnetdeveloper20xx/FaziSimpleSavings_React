import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastNotification from "./ToastNotification";

describe("ToastNotification", () => {
  it("renders success message and triggers onClose when clicked", async () => {
    const onClose = jest.fn();

    render(
      <ToastNotification
        message='Goal created successfully'
        type='success'
        onClose={onClose}
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/goal created successfully/i);

    await userEvent.click(alert);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders error message without crashing", () => {
    render(
      <ToastNotification
        message='Something went wrong'
        type='error'
        onClose={() => {}}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      /something went wrong/i
    );
  });
});
