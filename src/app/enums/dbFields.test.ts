import { Fields } from "./dbFields";

describe("Fields enum", () => {
  it("should have all expected field values", () => {
    expect(Fields.Name).toBe("name");
    expect(Fields.Description).toBe("description");
    expect(Fields.IsAvailable).toBe("isAvailable");
    expect(Fields.Section).toBe("section");
    expect(Fields.SectionId).toBe("sectionId");
    expect(Fields.Allergens).toBe("allergens");
    expect(Fields.Variants).toBe("variants");
    expect(Fields.Variant).toBe("variant");
    expect(Fields.ExtraPrice).toBe("extraPrice");
    expect(Fields.ExtraIngredients).toBe("extraIngredients");
    expect(Fields.RemovableIngredients).toBe("removableIngredients");
    expect(Fields.Picture).toBe("picture");
    expect(Fields.Background).toBe("background");
    expect(Fields.Price).toBe("price");
    expect(Fields.DishesList).toBe("dishesList");
    expect(Fields.DeliveryMethod).toBe("deliveryMethod");
    expect(Fields.TableNumber).toBe("tableNumber");
    expect(Fields.HoursOfAvailability).toBe("hoursOfAvailability");
    expect(Fields.OpeningHours).toBe("openingHours");
    expect(Fields.OpenDays).toBe("openDays");
    expect(Fields.Currency).toBe("currency");
    expect(Fields.ClientName).toBe("clientName");
    expect(Fields.PhoneNumber).toBe("phoneNumber");
    expect(Fields.PaymentMethod).toBe("paymentMethod");
  });

  it("should have 24 fields", () => {
    const fieldCount = Object.keys(Fields).length;
    expect(fieldCount).toBe(24);
  });
});
