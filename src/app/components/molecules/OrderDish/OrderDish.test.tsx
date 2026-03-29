import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import OrderDish from "./OrderDish";
import { IOrderedDish } from "../../../types/Orders";

const renderOrderDish = (dish: IOrderedDish) => {
  return render(
    <ThemeProvider theme={theme}>
      <OrderDish dish={dish} />
    </ThemeProvider>
  );
};

describe("OrderDish", () => {
  const baseDish: IOrderedDish = {
    _id: "od1",
    name: "Pizza Margherita",
    amount: 2,
    price: 20,
    currency: "PLN",
    totalPrice: 40,
  };

  it("should render dish name with amount", () => {
    renderOrderDish(baseDish);

    expect(screen.getByText("Pizza Margherita x2")).toBeInTheDocument();
  });

  it("should render variant when provided", () => {
    renderOrderDish({ ...baseDish, variant: "Large" });

    expect(screen.getByText("Large")).toBeInTheDocument();
  });

  it("should render extra ingredients with + prefix", () => {
    renderOrderDish({
      ...baseDish,
      extraIngredients: ["Cheese", "Mushrooms"],
    });

    expect(screen.getByText("+ Cheese")).toBeInTheDocument();
    expect(screen.getByText("+ Mushrooms")).toBeInTheDocument();
  });

  it("should render removable ingredients with - prefix", () => {
    renderOrderDish({
      ...baseDish,
      removableIngredients: ["Olives", "Onion"],
    });

    expect(screen.getByText("- Olives")).toBeInTheDocument();
    expect(screen.getByText("- Onion")).toBeInTheDocument();
  });

  it("should render a checkbox", () => {
    renderOrderDish(baseDish);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("should handle dish with all optional fields", () => {
    const fullDish: IOrderedDish = {
      ...baseDish,
      variant: "42cm",
      extraIngredients: ["Pepper"],
      removableIngredients: ["Corn"],
    };
    renderOrderDish(fullDish);

    expect(screen.getByText("Pizza Margherita x2")).toBeInTheDocument();
    expect(screen.getByText("42cm")).toBeInTheDocument();
    expect(screen.getByText("+ Pepper")).toBeInTheDocument();
    expect(screen.getByText("- Corn")).toBeInTheDocument();
  });
});
