import {
  getAllController,
  getSingleController,
  postController,
  putController,
  deleteController,
  getCurrencyController,
} from "./controllers";
import { Request, Response } from "express";
import { Model, Document } from "mongoose";
import { RestaurantModel } from "./models/restaurant";

// Mock the models
jest.mock("./models/restaurant", () => ({
  RestaurantModel: {
    find: jest.fn(),
  },
}));

jest.mock("./models/order", () => ({
  OrderModel: {},
}));

jest.mock("./infobip-sms-service", () => ({
  sendSmsViaInfobip: jest.fn().mockResolvedValue(undefined),
}));

type MockModel = Partial<Model<Document>>;

const createMockReq = (params: Record<string, string> = {}, body: Record<string, unknown> = {}): Partial<Request> => ({
  params,
  body,
});

const createMockRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockedRestaurantModel = jest.mocked(RestaurantModel);

describe("Backend Controllers", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("getAllController", () => {
    it("should return all items with status 200", async () => {
      const mockData = [{ name: "Item 1" }, { name: "Item 2" }];
      const mockModel: MockModel = { find: jest.fn().mockResolvedValue(mockData) };
      const controller = getAllController({ model: mockModel as Model<Document> });
      const req = createMockReq();
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(mockModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return 500 on database error", async () => {
      const mockModel: MockModel = { find: jest.fn().mockRejectedValue(new Error("DB error")) };
      const controller = getAllController({ model: mockModel as Model<Document> });
      const req = createMockReq();
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while processing the request" });
    });
  });

  describe("getSingleController", () => {
    it("should return a single item by id with status 200", async () => {
      const mockData = { _id: "123", name: "Item 1" };
      const mockModel: MockModel = { findById: jest.fn().mockResolvedValue(mockData) };
      const controller = getSingleController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "123" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(mockModel.findById).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return 500 on database error", async () => {
      const mockModel: MockModel = { findById: jest.fn().mockRejectedValue(new Error("DB error")) };
      const controller = getSingleController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "123" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("postController", () => {
    it("should create a new item and return 201", async () => {
      const mockData = { _id: "new1", name: "New Item" };
      const mockModel: MockModel = { create: jest.fn().mockResolvedValue(mockData) as MockModel["create"] };
      const controller = postController({ model: mockModel as Model<Document> });
      const req = createMockReq({}, { name: "New Item" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(mockModel.create).toHaveBeenCalledWith({ name: "New Item" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return 507 on creation error", async () => {
      const mockModel: MockModel = { create: jest.fn().mockRejectedValue(new Error("Create error")) as MockModel["create"] };
      const controller = postController({ model: mockModel as Model<Document> });
      const req = createMockReq({}, { name: "New Item" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(507);
      expect(res.json).toHaveBeenCalledWith({ error: "Error creating resource" });
    });
  });

  describe("putController", () => {
    it("should update an item and return 200", async () => {
      const mockData = { _id: "123", name: "Updated Item" };
      const mockModel: MockModel = {
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockData),
      };
      const controller = putController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "123" }, { name: "Updated Item" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { $set: { name: "Updated Item" } },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return 404 when item not found", async () => {
      const mockModel: MockModel = {
        findByIdAndUpdate: jest.fn().mockResolvedValue(null),
      };
      const controller = putController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "nonexistent" }, { name: "Updated" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Resource not found" });
    });
  });

  describe("deleteController", () => {
    it("should delete a non-order item and return success", async () => {
      const mockData = { _id: "123", name: "Item" };
      const mockModel: MockModel = {
        findByIdAndDelete: jest.fn().mockResolvedValue(mockData),
      };
      const controller = deleteController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "123" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith({ message: "Resource deleted successfully" });
    });

    it("should return 404 when item to delete is not found", async () => {
      const mockModel: MockModel = {
        findByIdAndDelete: jest.fn().mockResolvedValue(null),
      };
      const controller = deleteController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "nonexistent" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 500 on deletion error", async () => {
      const mockModel: MockModel = {
        findByIdAndDelete: jest.fn().mockRejectedValue(new Error("Delete error")),
      };
      const controller = deleteController({ model: mockModel as Model<Document> });
      const req = createMockReq({ id: "123" });
      const res = createMockRes();

      await controller(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error deleting resource" });
    });
  });

  describe("getCurrencyController", () => {
    it("should return currency from first restaurant", async () => {
      mockedRestaurantModel.find.mockResolvedValue([{ currency: "PLN" }] as Awaited<ReturnType<typeof RestaurantModel.find>>);
      const req = createMockReq();
      const res = createMockRes();

      await getCurrencyController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("PLN");
    });

    it("should return 500 on error", async () => {
      mockedRestaurantModel.find.mockRejectedValue(new Error("DB error"));
      const req = createMockReq();
      const res = createMockRes();

      await getCurrencyController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while processing the request" });
    });
  });
});
