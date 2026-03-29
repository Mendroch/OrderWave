import { convertToOrder } from "./convertToOrder";
import { ICartDish } from "../types/CartDish";
import { CheckoutData } from "../types/CheckoutData";

const mockCart: ICartDish[] = [
  {
    _id: "d1",
    name: "Pizza Margherita",
    description: "Classic pizza",
    variant: { name: "Large", extraPrice: 10, _id: "v1" },
    extraIngredients: [
      { name: "Cheese", extraPrice: 3, _id: "e1" },
      { name: "Mushrooms", extraPrice: 2, _id: "e2" },
    ],
    removableIngredients: ["Olives"],
    currency: "PLN",
    price: 35,
    amount: 2,
  },
  {
    _id: "d2",
    name: "Pasta Carbonara",
    currency: "PLN",
    price: 25,
    amount: 1,
  },
];

const checkoutDataTableService: CheckoutData = {
  clientName: "Jan Kowalski",
  deliveryMethod: "tableService",
  paymentMethod: "card",
  phoneNumber: "123456789",
  tableNumber: "5",
};

const checkoutDataPickUp: CheckoutData = {
  clientName: "Anna Nowak",
  deliveryMethod: "pickUp",
  paymentMethod: "blik",
  phoneNumber: "987654321",
  tableNumber: "10",
};

describe("convertToOrder", () => {
  it("should convert checkout data and cart to order format", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.clientName).toBe("Jan Kowalski");
    expect(result.deliveryMethod).toBe("tableService");
    expect(result.paymentMethod).toBe("card");
    expect(result.phoneNumber).toBe("123456789");
    expect(result.tableNumber).toBe("5");
    expect(result.number).toBeGreaterThanOrEqual(1);
    expect(result.number).toBeLessThanOrEqual(200);
    expect(result.createdAt).toBeDefined();
  });

  it("should generate a valid ISO date string", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);
    const parsedDate = new Date(result.createdAt);

    expect(parsedDate.toISOString()).toBe(result.createdAt);
  });

  it("should correctly map cart dishes to order dishes list", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.dishesList).toHaveLength(2);
    expect(result.dishesList[0]).toEqual({
      name: "Pizza Margherita",
      variant: "Large",
      extraIngredients: ["Cheese", "Mushrooms"],
      removableIngredients: ["Olives"],
      amount: 2,
      price: 35,
      currency: "PLN",
      totalPrice: 70,
    });
  });

  it("should handle dishes without variant", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.dishesList[1].variant).toBe("");
  });

  it("should handle dishes without extra ingredients", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.dishesList[1].extraIngredients).toEqual([]);
  });

  it("should handle dishes without removable ingredients", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.dishesList[1].removableIngredients).toEqual([]);
  });

  it("should set empty table number for non-tableService delivery", () => {
    const result = convertToOrder(checkoutDataPickUp, mockCart);

    expect(result.tableNumber).toBe("");
  });

  it("should keep table number only for tableService delivery", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.tableNumber).toBe("5");
  });

  it("should calculate totalPrice as price * amount for each dish", () => {
    const result = convertToOrder(checkoutDataTableService, mockCart);

    expect(result.dishesList[0].totalPrice).toBe(70); // 35 * 2
    expect(result.dishesList[1].totalPrice).toBe(25); // 25 * 1
  });

  it("should generate order number between 1 and 200", () => {
    // Generate multiple orders to verify randomness range
    for (let i = 0; i < 50; i++) {
      const result = convertToOrder(checkoutDataTableService, mockCart);
      expect(result.number).toBeGreaterThanOrEqual(1);
      expect(result.number).toBeLessThanOrEqual(200);
    }
  });
});
