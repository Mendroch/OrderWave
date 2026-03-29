import { convertData } from "./convertData";
import { IDish } from "../types/Dishes";
import { DetailsFormData } from "../types/DetailsFormData";

const baseDish: IDish = {
  _id: "dish1",
  name: "Pizza Margherita",
  description: "Classic Italian pizza",
  isAvailable: true,
  sectionId: "section1",
  price: 20,
  currency: "PLN",
};

const dishWithVariants: IDish = {
  ...baseDish,
  variants: [{ name: "Small", extraPrice: 0, _id: "v1" }],
};

(dishWithVariants.variants as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Large", extraPrice: 10, _id: "v2" }
);

const dishWithExtras: IDish = {
  ...baseDish,
  extraIngredients: [{ name: "Cheese", extraPrice: 3, _id: "e1" }],
};

(dishWithExtras.extraIngredients as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Mushrooms", extraPrice: 2, _id: "e2" }
);

describe("convertData", () => {
  it("should convert basic dish data without variants or extras", () => {
    const formData: DetailsFormData = {};
    const result = convertData(formData, baseDish, 20);

    expect(result).toEqual({
      _id: "dish1",
      name: "Pizza Margherita",
      description: "Classic Italian pizza",
      variant: undefined,
      extraIngredients: [],
      removableIngredients: [],
      currency: "PLN",
      price: 20,
      amount: 1,
    });
  });

  it("should convert dish with selected variant", () => {
    const formData: DetailsFormData = { variant: "1" };
    const result = convertData(formData, dishWithVariants, 30);

    expect(result.variant).toEqual({
      name: "Large",
      extraPrice: 10,
      _id: "v2",
    });
    expect(result.price).toBe(30);
  });

  it("should convert dish with selected extra ingredients (array)", () => {
    const formData: DetailsFormData = { extraIngredients: ["0", "1"] };
    const result = convertData(formData, dishWithExtras, 25);

    expect(result.extraIngredients).toEqual([
      { name: "Cheese", extraPrice: 3, _id: "e1" },
      { name: "Mushrooms", extraPrice: 2, _id: "e2" },
    ]);
  });

  it("should convert dish with single extra ingredient (string)", () => {
    const formData: DetailsFormData = { extraIngredients: "0" };
    const result = convertData(formData, dishWithExtras, 23);

    expect(result.extraIngredients).toEqual([
      { name: "Cheese", extraPrice: 3, _id: "e1" },
    ]);
  });

  it("should include removable ingredients when provided", () => {
    const formData: DetailsFormData = { removableIngredients: ["Olives", "Onion"] };
    const result = convertData(formData, baseDish, 20);

    expect(result.removableIngredients).toEqual(["Olives", "Onion"]);
  });

  it("should handle dish without description", () => {
    const dishNoDesc = { ...baseDish, description: undefined };
    const formData: DetailsFormData = {};
    const result = convertData(formData, dishNoDesc, 20);

    expect(result.description).toBe("");
  });

  it("should handle dish without currency", () => {
    const dishNoCurrency = { ...baseDish, currency: undefined };
    const formData: DetailsFormData = {};
    const result = convertData(formData, dishNoCurrency, 20);

    expect(result.currency).toBe("");
  });

  it("should always set amount to 1", () => {
    const formData: DetailsFormData = {};
    const result = convertData(formData, baseDish, 20);

    expect(result.amount).toBe(1);
  });

  it("should throw error when dish is falsy", () => {
    const formData: DetailsFormData = {};
    expect(() => convertData(formData, null as unknown as IDish, 20)).toThrow("Dish data is required for conversion");
  });
});
