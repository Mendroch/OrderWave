import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../../../assets/styles/theme";
import DecisionModal from "./DecisionModal";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        modal__cancel: "Cancel",
        modal__confirm: "Confirm",
      };
      return translations[key] || key;
    },
  }),
}));

const renderDecisionModal = (
  handleClose = jest.fn(),
  onConfirm = jest.fn(),
  question = "Are you sure?",
  description = "This action cannot be undone."
) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <DecisionModal
          handleClose={handleClose}
          onConfirm={onConfirm}
          question={question}
          description={description}
        />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("DecisionModal", () => {
  it("should render question text", () => {
    renderDecisionModal();

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should render description text", () => {
    renderDecisionModal();

    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("should render cancel and confirm buttons", () => {
    renderDecisionModal();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("should call handleClose when cancel is clicked", () => {
    const handleClose = jest.fn();
    renderDecisionModal(handleClose);

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should call both handleClose and onConfirm when confirm is clicked", () => {
    const handleClose = jest.fn();
    const onConfirm = jest.fn();
    renderDecisionModal(handleClose, onConfirm);

    fireEvent.click(screen.getByText("Confirm"));
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should render without description", () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <DecisionModal
            handleClose={jest.fn()}
            onConfirm={jest.fn()}
            question="Delete item?"
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText("Delete item?")).toBeInTheDocument();
  });
});
