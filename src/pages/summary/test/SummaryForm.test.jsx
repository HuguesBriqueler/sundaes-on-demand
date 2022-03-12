import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Check 'Terms and Condition' to enable 'Order' button", () => {
  test("Initial conditions : checkbox unchecked & button disabled", () => {
    render(<SummaryForm />);
    const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    expect(termsAndConditionsCheckbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();
  });
  test("Button is enabled when checkbox is checked", () => {
    render(<SummaryForm />);
    const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    fireEvent.click(termsAndConditionsCheckbox);
    expect(confirmOrderButton).toBeEnabled();
  });
  test("Button is disabled when checkbox is unchecked again", () => {
    render(<SummaryForm />);
    const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    fireEvent.click(termsAndConditionsCheckbox);
    fireEvent.click(termsAndConditionsCheckbox);
    expect(confirmOrderButton).toBeDisabled();
  });
});
