import { LANGUAGES } from "./index";

describe("Constants", () => {
  describe("LANGUAGES", () => {
    it("should contain English and Polish", () => {
      expect(LANGUAGES).toHaveLength(2);
    });

    it("should have English with code 'en'", () => {
      const english = LANGUAGES.find((lang) => lang.code === "en");
      expect(english).toBeDefined();
      expect(english?.label).toBe("English");
    });

    it("should have Polish with code 'pl'", () => {
      const polish = LANGUAGES.find((lang) => lang.code === "pl");
      expect(polish).toBeDefined();
      expect(polish?.label).toBe("Polish");
    });

    it("should have unique codes", () => {
      const codes = LANGUAGES.map((lang) => lang.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });
  });
});
