import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import OrdersList from "./OrdersList";
import { IOrders } from "../../../types/Orders";

const mockOrders: IOrders = [
  {
    _id: "order1",
    number: 101,
    dishesList: [],
    deliveryMethod: "tableService",
    phoneNumber: "123456789",
    clientName: "Jan",
  },
  {
    _id: "order2",
    number: 102,
    dishesList: [],
    deliveryMethod: "pickUp",
    phoneNumber: "987654321",
    clientName: "Anna",
  },
  {
    _id: "order3",
    number: 103,
    dishesList: [],
    deliveryMethod: "takeAway",
    phoneNumber: "555666777",
    clientName: "Tomek",
  },
];

const renderOrdersList = (
  activeOrderId = "order1",
  setActiveOrderId = jest.fn()
) => {
  return render(
    <ThemeProvider theme={theme}>
      <OrdersList
        orders={mockOrders}
        activeOrderId={activeOrderId}
        setActiveOrderId={setActiveOrderId}
      />
    </ThemeProvider>
  );
};

describe("OrdersList", () => {
  it("should render all order numbers", () => {
    renderOrdersList();

    expect(screen.getByText("#101")).toBeInTheDocument();
    expect(screen.getByText("#102")).toBeInTheDocument();
    expect(screen.getByText("#103")).toBeInTheDocument();
  });

  it("should call setActiveOrderId when an order is clicked", () => {
    const setActiveOrderId = jest.fn();
    renderOrdersList("order1", setActiveOrderId);

    fireEvent.click(screen.getByText("#102"));
    expect(setActiveOrderId).toHaveBeenCalledWith("order2");
  });

  it("should render empty list for no orders", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <OrdersList
          orders={[]}
          activeOrderId=""
          setActiveOrderId={jest.fn()}
        />
      </ThemeProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
