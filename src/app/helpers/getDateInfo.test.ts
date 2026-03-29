import { getDateInfo } from "./getDateInfo";

describe("getDateInfo", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return dayNum and fullHour", () => {
    const result = getDateInfo();

    expect(result).toHaveProperty("dayNum");
    expect(result).toHaveProperty("fullHour");
  });

  it("should return Monday as 0 (day index for Mon)", () => {
    // Monday, Jan 6, 2025, 14:30
    jest.setSystemTime(new Date(2025, 0, 6, 14, 30));
    const result = getDateInfo();

    expect(result.dayNum).toBe(0); // Monday -> getDay() = 1 -> 1 - 1 = 0
  });

  it("should return Sunday as 6", () => {
    // Sunday, Jan 5, 2025, 10:00
    jest.setSystemTime(new Date(2025, 0, 5, 10, 0));
    const result = getDateInfo();

    expect(result.dayNum).toBe(6); // Sunday -> getDay() = 0 -> mapped to 6
  });

  it("should return Wednesday as 2", () => {
    // Wednesday, Jan 8, 2025, 12:00
    jest.setSystemTime(new Date(2025, 0, 8, 12, 0));
    const result = getDateInfo();

    expect(result.dayNum).toBe(2);
  });

  it("should return Saturday as 5", () => {
    // Saturday, Jan 4, 2025, 20:00
    jest.setSystemTime(new Date(2025, 0, 4, 20, 0));
    const result = getDateInfo();

    expect(result.dayNum).toBe(5);
  });

  it("should format hours with leading zero", () => {
    jest.setSystemTime(new Date(2025, 0, 6, 9, 5));
    const result = getDateInfo();

    expect(result.fullHour).toBe("09:05");
  });

  it("should format hours without leading zero for two-digit values", () => {
    jest.setSystemTime(new Date(2025, 0, 6, 14, 30));
    const result = getDateInfo();

    expect(result.fullHour).toBe("14:30");
  });

  it("should handle midnight correctly", () => {
    jest.setSystemTime(new Date(2025, 0, 6, 0, 0));
    const result = getDateInfo();

    expect(result.fullHour).toBe("00:00");
  });

  it("should handle end of day correctly", () => {
    jest.setSystemTime(new Date(2025, 0, 6, 23, 59));
    const result = getDateInfo();

    expect(result.fullHour).toBe("23:59");
  });
});
