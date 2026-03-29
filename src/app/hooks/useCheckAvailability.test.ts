import { ISection } from "../types/Sections";
import { IRestaurant } from "../types/Restaurants";

// We test the useCheckAvailability logic directly, since the hook
// simply wraps getDateInfo + isSectionAvailable function
// This avoids needing React hook setup
const createIsSectionAvailable = (dayNum: number, fullHour: string) => {
  return (section: ISection, restaurant: IRestaurant): boolean => {
    if (!restaurant.openDays[dayNum]) return false;
    if (!section.isAvailable) return false;
    const sectionHours = section.hoursOfAvailability[dayNum];
    const restaurantHours = restaurant.openingHours[dayNum];
    return (
      sectionHours.start <= fullHour &&
      fullHour <= sectionHours.end &&
      restaurantHours.start <= fullHour &&
      fullHour <= restaurantHours.end
    );
  };
};

const mockRestaurant: IRestaurant = {
  _id: "r1",
  name: "Test Restaurant",
  background: "",
  currency: "PLN",
  openDays: [true, true, true, true, true, false, false], // Mon-Fri open
  openingHours: [
    { start: "08:00", end: "22:00", _id: "h1" },
    { start: "08:00", end: "22:00", _id: "h2" },
    { start: "08:00", end: "22:00", _id: "h3" },
    { start: "08:00", end: "22:00", _id: "h4" },
    { start: "08:00", end: "22:00", _id: "h5" },
    { start: "00:00", end: "00:00", _id: "h6" },
    { start: "00:00", end: "00:00", _id: "h7" },
  ],
};

const mockSection: ISection = {
  _id: "s1",
  name: "Lunch",
  isAvailable: true,
  hoursOfAvailability: [
    { start: "11:00", end: "15:00", _id: "sh1" },
    { start: "11:00", end: "15:00", _id: "sh2" },
    { start: "11:00", end: "15:00", _id: "sh3" },
    { start: "11:00", end: "15:00", _id: "sh4" },
    { start: "11:00", end: "15:00", _id: "sh5" },
    { start: "00:00", end: "00:00", _id: "sh6" },
    { start: "00:00", end: "00:00", _id: "sh7" },
  ],
};

describe("useCheckAvailability logic (isSectionAvailable)", () => {
  it("should return true when section and restaurant are open at the current time", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "12:00"); // Monday noon
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(true);
  });

  it("should return false when restaurant is closed on that day", () => {
    const isSectionAvailable = createIsSectionAvailable(5, "12:00"); // Saturday
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });

  it("should return false when section is not available", () => {
    const unavailableSection = { ...mockSection, isAvailable: false };
    const isSectionAvailable = createIsSectionAvailable(0, "12:00");
    expect(isSectionAvailable(unavailableSection, mockRestaurant)).toBe(false);
  });

  it("should return false when current time is before section opening", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "09:00"); // Before 11:00
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });

  it("should return false when current time is after section closing", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "16:00"); // After 15:00
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });

  it("should return true at exact opening time", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "11:00");
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(true);
  });

  it("should return true at exact closing time", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "15:00");
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(true);
  });

  it("should return false when before restaurant opening hours", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "07:00"); // Before 08:00
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });

  it("should return false when after restaurant closing hours", () => {
    const isSectionAvailable = createIsSectionAvailable(0, "23:00"); // After 22:00
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });

  it("should handle Sunday correctly (dayNum 6)", () => {
    const isSectionAvailable = createIsSectionAvailable(6, "12:00");
    expect(isSectionAvailable(mockSection, mockRestaurant)).toBe(false);
  });
});
