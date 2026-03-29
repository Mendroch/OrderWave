import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../../../assets/styles/theme";
import ActionStrip from "./ActionStrip";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        orders__deliveryMethod: "Delivery method",
        orders__tableService: "Table Service",
        orders__pickUp: "Pick Up",
        orders__takeAway: "Take Away",
        orders__confirm: "Confirm Order",
      };
      return translations[key] || key;
    },
  }),
}));

const renderActionStrip = (
  deliveryMethod = "tableService",
  tableNumber = "5",
  isActive = true,
  onClick = jest.fn()
) => {
  return {
    onClick,
    ...render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ActionStrip
            deliveryMethod={deliveryMethod}
            tableNumber={tableNumber}
            isActive={isActive}
            onClick={onClick}
          />
        </MemoryRouter>
      </ThemeProvider>
    ),
  };
};

describe("ActionStrip", () => {
  it("should render delivery method text", () => {
    renderActionStrip();

    expect(screen.getByText(/Delivery method/)).toBeInTheDocument();
  });

  it("should render confirm button", () => {
    renderActionStrip();

    expect(screen.getByText("Confirm Order")).toBeInTheDocument();
  });

  it("should display table number for table service", () => {
    renderActionStrip("tableService", "12");

    expect(screen.getByText(/12/)).toBeInTheDocument();
  });

  it("should call onClick when confirm button is clicked and active", () => {
    const { onClick } = renderActionStrip("tableService", "5", true);

    fireEvent.click(screen.getByText("Confirm Order"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when confirm button is clicked and inactive", () => {
    const { onClick } = renderActionStrip("tableService", "5", false);

    fireEvent.click(screen.getByText("Confirm Order"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
