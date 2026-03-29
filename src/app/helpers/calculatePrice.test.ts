import { calculatePrice } from "./calculatePrice";
import { IDish } from "../types/Dishes";

const baseDish: IDish = {
  _id: "dish1",
  name: "Pizza Margherita",
  isAvailable: true,
  sectionId: "section1",
  price: 20,
  currency: "PLN",
};

const dishWithVariants: IDish = {
  ...baseDish,
  variants: [
    { name: "Small", extraPrice: 0, _id: "v1" },
  ],
};

// TypeScript tuple workaround: push additional items
(dishWithVariants.variants as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Medium", extraPrice: 5, _id: "v2" },
  { name: "Large", extraPrice: 10, _id: "v3" }
);

const dishWithExtras: IDish = {
  ...baseDish,
  extraIngredients: [
    { name: "Cheese", extraPrice: 3, _id: "e1" },
  ],
};

(dishWithExtras.extraIngredients as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Mushrooms", extraPrice: 2, _id: "e2" },
  { name: "Pepperoni", extraPrice: 4, _id: "e3" }
);

const fullDish: IDish = {
  ...baseDish,
  variants: [
    { name: "Small", extraPrice: 0, _id: "v1" },
  ],
  extraIngredients: [
    { name: "Cheese", extraPrice: 3, _id: "e1" },
  ],
};

(fullDish.variants as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Large", extraPrice: 10, _id: "v2" }
);
(fullDish.extraIngredients as Array<{ name: string; extraPrice: number; _id: string }>).push(
  { name: "Mushrooms", extraPrice: 2, _id: "e2" }
);

describe("calculatePrice", () => {
  describe("when dish is undefined", () => {
    it("should return 0", () => {
      expect(calculatePrice(undefined)).toBe(0);
    });

    it("should return 0 even with variant and extras provided", () => {
      expect(calculatePrice(undefined, "0", ["0", "1"])).toBe(0);
    });
  });

  describe("when dish has no variants or extras", () => {
    it("should return base price", () => {
      expect(calculatePrice(baseDish)).toBe(20);
    });

    it("should return base price when variant index is provided but dish has no variants", () => {
      expect(calculatePrice(baseDish, "0")).toBe(20);
    });
  });

  describe("with variants", () => {
    it("should add variant extra price to base price", () => {
      expect(calculatePrice(dishWithVariants, "2")).toBe(30); // 20 + 10
    });

    it("should handle variant with zero extra price", () => {
      expect(calculatePrice(dishWithVariants, "0")).toBe(20); // 20 + 0
    });

    it("should handle medium variant", () => {
      expect(calculatePrice(dishWithVariants, "1")).toBe(25); // 20 + 5
    });

    it("should return base price when no variant is selected", () => {
      expect(calculatePrice(dishWithVariants)).toBe(20);
    });
  });

  describe("with extra ingredients", () => {
    it("should add single extra ingredient price (as array)", () => {
      expect(calculatePrice(dishWithExtras, undefined, ["0"])).toBe(23); // 20 + 3
    });

    it("should add multiple extra ingredients prices", () => {
      expect(calculatePrice(dishWithExtras, undefined, ["0", "1"])).toBe(25); // 20 + 3 + 2
    });

    it("should add all extra ingredients", () => {
      expect(calculatePrice(dishWithExtras, undefined, ["0", "1", "2"])).toBe(29); // 20 + 3 + 2 + 4
    });

    it("should handle single extra ingredient (as string)", () => {
      expect(calculatePrice(dishWithExtras, undefined, "1")).toBe(22); // 20 + 2
    });

    it("should return base price when no extras selected", () => {
      expect(calculatePrice(dishWithExtras)).toBe(20);
    });
  });

  describe("with both variants and extras", () => {
    it("should add both variant and extras prices", () => {
      expect(calculatePrice(fullDish, "1", ["0", "1"])).toBe(35); // 20 + 10 + 3 + 2
    });

    it("should handle variant only from full dish", () => {
      expect(calculatePrice(fullDish, "1")).toBe(30); // 20 + 10
    });

    it("should handle extras only from full dish", () => {
      expect(calculatePrice(fullDish, undefined, ["0"])).toBe(23); // 20 + 3
    });
  });
});
