import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../../../assets/styles/theme";
import Dish from "./Dish";
import { IDish } from "../../../types/Dishes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        menu__unavailable: "Unavailable",
      };
      return translations[key] || key;
    },
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const baseDish: IDish = {
  _id: "d1",
  name: "Pizza Margherita",
  description: "Classic Italian pizza",
  isAvailable: true,
  sectionId: "s1",
  price: 20,
  allergens: ["Gluten", "Dairy"],
};

const renderDish = (
  dish: IDish = baseDish,
  currency = "PLN",
  isSectionAvailable = true
) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Dish dish={dish} currency={currency} isSectionAvailable={isSectionAvailable} />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("Dish", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render dish name", () => {
    renderDish();

    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("should render dish description", () => {
    renderDish();

    expect(screen.getByText("Classic Italian pizza")).toBeInTheDocument();
  });

  it("should render dish price with currency", () => {
    renderDish();

    expect(screen.getByText("20 PLN")).toBeInTheDocument();
  });

  it("should render allergens", () => {
    renderDish();

    expect(screen.getByText("Gluten")).toBeInTheDocument();
    expect(screen.getByText("Dairy")).toBeInTheDocument();
  });

  it("should show Unavailable when dish is not available", () => {
    renderDish({ ...baseDish, isAvailable: false });

    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("should show Unavailable when section is not available", () => {
    renderDish(baseDish, "PLN", false);

    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("should not show Unavailable when both dish and section are available", () => {
    renderDish();

    expect(screen.queryByText("Unavailable")).not.toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    const dish = { ...baseDish, description: undefined };
    renderDish(dish);

    expect(screen.queryByText("Classic Italian pizza")).not.toBeInTheDocument();
  });

  it("should not render allergens when not provided", () => {
    const dish = { ...baseDish, allergens: undefined };
    renderDish(dish);

    expect(screen.queryByText("Gluten")).not.toBeInTheDocument();
  });
});
