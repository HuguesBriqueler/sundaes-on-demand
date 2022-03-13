import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    userEvent.click(termsAndConditionsCheckbox);
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
    userEvent.click(termsAndConditionsCheckbox);
    userEvent.click(termsAndConditionsCheckbox);
    expect(confirmOrderButton).toBeDisabled();
  });
});

describe("Popover responds to hover", () => {
  test("popover starts out hidden", () => {
    render(<SummaryForm />);
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).not.toBeInTheDocument();
  });
  test("popover appears upon mouseover of checkbox label", async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    await waitFor(() => expect(popover).toBeInTheDocument());
  });
  test("popover disappears when mouse get out of label", async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    userEvent.unhover(termsAndConditions);
    // waitForElementToBeRemoved act as an assertion on its own, so we don't need to
    // expect(popover).not.toBeInTheDocument() (that cause a "not wrapped in act(...)" error)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
