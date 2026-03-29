import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import CartItemDetails from "./CartItemDetails";
import { ICartDish } from "../../../types/CartDish";

const renderComponent = (dish: ICartDish) => {
  return render(
    <ThemeProvider theme={theme}>
      <CartItemDetails dish={dish} />
    </ThemeProvider>
  );
};

describe("CartItemDetails", () => {
  const baseDish: ICartDish = {
    _id: "d1",
    name: "Pizza",
    price: 20,
    currency: "PLN",
    amount: 1,
  };

  it("should render without crashing for basic dish", () => {
    const { container } = renderComponent(baseDish);
    expect(container).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    renderComponent({ ...baseDish, description: "Delicious pizza" });

    expect(screen.getByText("Delicious pizza")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    renderComponent(baseDish);

    expect(screen.queryByText("Delicious pizza")).not.toBeInTheDocument();
  });

  it("should render extra ingredients with prices", () => {
    const dish: ICartDish = {
      ...baseDish,
      extraIngredients: [
        { name: "Cheese", extraPrice: 3, _id: "e1" },
        { name: "Mushrooms", extraPrice: 2, _id: "e2" },
      ],
    };
    renderComponent(dish);

    expect(screen.getByText("+ Cheese (3 PLN)")).toBeInTheDocument();
    expect(screen.getByText("+ Mushrooms (2 PLN)")).toBeInTheDocument();
  });

  it("should render removable ingredients", () => {
    const dish: ICartDish = {
      ...baseDish,
      removableIngredients: ["Olives", "Onion"],
    };
    renderComponent(dish);

    expect(screen.getByText("- Olives")).toBeInTheDocument();
    expect(screen.getByText("- Onion")).toBeInTheDocument();
  });

  it("should handle undefined dish gracefully", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CartItemDetails dish={undefined as unknown as ICartDish} />
      </ThemeProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
