import { sendSmsViaInfobip } from "./infobip-sms-service";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("sendSmsViaInfobip", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    process.env = {
      ...originalEnv,
      INFOBIP_API_KEY: "test-api-key",
      INFOBIP_BASE_URL: "test.api.infobip.com",
      INFOBIP_SENDER_NUMBER: "48123456789",
    };
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should throw error when INFOBIP_API_KEY is not set", async () => {
    delete process.env.INFOBIP_API_KEY;

    await expect(
      sendSmsViaInfobip({ phoneNumber: "+48123456789", message: "Test" })
    ).rejects.toThrow("INFOBIP_API_KEY environment variable is not set");
  });

  it("should call fetch with correct URL and headers", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [{ status: { name: "PENDING" } }] }),
    });

    await sendSmsViaInfobip({ phoneNumber: "+48123456789", message: "Test message" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://test.api.infobip.com/sms/3/messages",
      expect.objectContaining({
        method: "POST",
        redirect: "follow",
      })
    );
  });

  it("should format phone number by removing spaces and dashes", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [] }),
    });

    await sendSmsViaInfobip({ phoneNumber: "+48 123-456-789", message: "Test" });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.messages[0].destinations[0].to).toBe("48123456789");
  });

  it("should remove leading + from phone number", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [] }),
    });

    await sendSmsViaInfobip({ phoneNumber: "+48123456789", message: "Test" });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.messages[0].destinations[0].to).toBe("48123456789");
  });

  it("should keep phone number without + prefix as-is", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [] }),
    });

    await sendSmsViaInfobip({ phoneNumber: "48123456789", message: "Test" });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.messages[0].destinations[0].to).toBe("48123456789");
  });

  it("should include message text in the request body", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [] }),
    });

    await sendSmsViaInfobip({ phoneNumber: "48123456789", message: "Your order is ready!" });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.messages[0].content.text).toBe("Your order is ready!");
  });

  it("should use custom sender when provided", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messages: [] }),
    });

    await sendSmsViaInfobip({
      phoneNumber: "48123456789",
      message: "Test",
      sender: "CustomSender",
    });

    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.messages[0].sender).toBe("CustomSender");
  });

  it("should throw error on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    });

    await expect(
      sendSmsViaInfobip({ phoneNumber: "48123456789", message: "Test" })
    ).rejects.toThrow("Infobip API error: 401 - Unauthorized");
  });

  it("should throw error on network failure", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    await expect(
      sendSmsViaInfobip({ phoneNumber: "48123456789", message: "Test" })
    ).rejects.toThrow("Network error");
  });
});
