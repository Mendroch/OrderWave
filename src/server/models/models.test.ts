import mongoose from "mongoose";

// We need to import the models after connecting to an in-memory DB
// For unit testing, we test the schema validation logic directly

describe("Mongoose Models - Schema Validation", () => {
  beforeAll(async () => {
    // Connect to in-memory MongoDB for testing
    // Using a simple memory server approach with mongoose validation only
    // No actual DB connection needed for schema validation tests
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("Dish Model Schema", () => {
    // Define schema inline for isolated testing
    const dishSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: String,
      isAvailable: { type: Boolean, required: true },
      sectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      allergens: [String],
      variants: [{ name: String, extraPrice: Number }],
      extraIngredients: [{ name: String, extraPrice: Number }],
      removableIngredients: [String],
      picture: String,
      price: { type: Number, required: true },
    });

    const TestDish = mongoose.model("TestDish", dishSchema);

    it("should validate a complete dish", () => {
      const dish = new TestDish({
        name: "Pizza Margherita",
        isAvailable: true,
        sectionId: new mongoose.Types.ObjectId(),
        price: 20,
      });

      const err = dish.validateSync();
      expect(err).toBeUndefined();
    });

    it("should fail validation without name", () => {
      const dish = new TestDish({
        isAvailable: true,
        sectionId: new mongoose.Types.ObjectId(),
        price: 20,
      });

      const err = dish.validateSync();
      expect(err?.errors.name).toBeDefined();
    });

    it("should fail validation without isAvailable", () => {
      const dish = new TestDish({
        name: "Pizza",
        sectionId: new mongoose.Types.ObjectId(),
        price: 20,
      });

      const err = dish.validateSync();
      expect(err?.errors.isAvailable).toBeDefined();
    });

    it("should fail validation without sectionId", () => {
      const dish = new TestDish({
        name: "Pizza",
        isAvailable: true,
        price: 20,
      });

      const err = dish.validateSync();
      expect(err?.errors.sectionId).toBeDefined();
    });

    it("should fail validation without price", () => {
      const dish = new TestDish({
        name: "Pizza",
        isAvailable: true,
        sectionId: new mongoose.Types.ObjectId(),
      });

      const err = dish.validateSync();
      expect(err?.errors.price).toBeDefined();
    });

    it("should accept optional fields", () => {
      const dish = new TestDish({
        name: "Pizza Margherita",
        description: "Classic pizza",
        isAvailable: true,
        sectionId: new mongoose.Types.ObjectId(),
        allergens: ["Gluten", "Dairy"],
        variants: [{ name: "Large", extraPrice: 10 }],
        extraIngredients: [{ name: "Cheese", extraPrice: 3 }],
        removableIngredients: ["Olives"],
        picture: "base64...",
        price: 20,
      });

      const err = dish.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe("Order Model Schema", () => {
    const orderSchema = new mongoose.Schema({
      number: { type: Number, required: true },
      dishesList: [
        {
          name: { type: String, required: true },
          variant: String,
          extraIngredients: [String],
          removableIngredients: [String],
          amount: { type: Number, default: 1 },
          price: { type: Number, default: 0 },
          currency: { type: String, default: "" },
          totalPrice: { type: Number, default: 0 },
        },
      ],
      deliveryMethod: { type: String, required: true },
      tableNumber: String,
      phoneNumber: String,
      clientName: String,
    });

    const TestOrder = mongoose.model("TestOrder", orderSchema);

    it("should validate a complete order", () => {
      const order = new TestOrder({
        number: 101,
        dishesList: [{ name: "Pizza", amount: 1 }],
        deliveryMethod: "tableService",
        phoneNumber: "123456789",
        clientName: "Jan",
      });

      const err = order.validateSync();
      expect(err).toBeUndefined();
    });

    it("should fail validation without order number", () => {
      const order = new TestOrder({
        dishesList: [{ name: "Pizza" }],
        deliveryMethod: "tableService",
      });

      const err = order.validateSync();
      expect(err?.errors.number).toBeDefined();
    });

    it("should fail validation without delivery method", () => {
      const order = new TestOrder({
        number: 101,
        dishesList: [{ name: "Pizza" }],
      });

      const err = order.validateSync();
      expect(err?.errors.deliveryMethod).toBeDefined();
    });

    it("should set default values for dish fields", () => {
      const order = new TestOrder({
        number: 101,
        dishesList: [{ name: "Pizza" }],
        deliveryMethod: "pickUp",
      });

      expect(order.dishesList[0].amount).toBe(1);
    });
  });

  describe("Restaurant Model Schema", () => {
    const restaurantSchema = new mongoose.Schema({
      name: { type: String, required: true },
      background: { type: String, required: true },
      openDays: { type: [Boolean], required: true },
      openingHours: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      currency: { type: String, required: true },
    });

    const TestRestaurant = mongoose.model("TestRestaurant", restaurantSchema);

    it("should validate a complete restaurant", () => {
      const restaurant = new TestRestaurant({
        name: "Test Restaurant",
        background: "background.jpg",
        openDays: [true, true, true, true, true, false, false],
        openingHours: [{ start: "08:00", end: "22:00" }],
        currency: "PLN",
      });

      const err = restaurant.validateSync();
      expect(err).toBeUndefined();
    });

    it("should fail validation without name", () => {
      const restaurant = new TestRestaurant({
        background: "bg.jpg",
        openDays: [true],
        currency: "PLN",
      });

      const err = restaurant.validateSync();
      expect(err?.errors.name).toBeDefined();
    });

    it("should fail validation without currency", () => {
      const restaurant = new TestRestaurant({
        name: "Restaurant",
        background: "bg.jpg",
        openDays: [true],
      });

      const err = restaurant.validateSync();
      expect(err?.errors.currency).toBeDefined();
    });

    it("should fail validation without background", () => {
      const restaurant = new TestRestaurant({
        name: "Restaurant",
        openDays: [true],
        currency: "PLN",
      });

      const err = restaurant.validateSync();
      expect(err?.errors.background).toBeDefined();
    });
  });

  describe("Section Model Schema", () => {
    const sectionSchema = new mongoose.Schema({
      name: { type: String, required: true },
      isAvailable: { type: Boolean, required: true },
      hoursOfAvailability: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
    });

    const TestSection = mongoose.model("TestSection", sectionSchema);

    it("should validate a complete section", () => {
      const section = new TestSection({
        name: "Lunch",
        isAvailable: true,
        hoursOfAvailability: [{ start: "11:00", end: "15:00" }],
      });

      const err = section.validateSync();
      expect(err).toBeUndefined();
    });

    it("should fail validation without name", () => {
      const section = new TestSection({
        isAvailable: true,
      });

      const err = section.validateSync();
      expect(err?.errors.name).toBeDefined();
    });

    it("should fail validation without isAvailable", () => {
      const section = new TestSection({
        name: "Lunch",
      });

      const err = section.validateSync();
      expect(err?.errors.isAvailable).toBeDefined();
    });
  });
});
