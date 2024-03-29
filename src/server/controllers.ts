import { Request, Response } from "express";
import { Model } from "mongoose";
import { RestaurantModel } from "./models/restaurant";
import { OrderModel } from "./models/order";
import { SMSAPI } from "smsapi";

interface ControllerOptions {
  model: Model<any>;
}

export const getAllController = ({ model }: ControllerOptions) => {
  return async (_: Request, res: Response) => {
    try {
      const data = await model.find();
      res.status(200).json(data);
    } catch (error) {
      console.error("An error occurred while retrieving data", error);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  };
};

export const getSingleController = ({ model }: ControllerOptions) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await model.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      console.error("An error occurred while retrieving data", error);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  };
};

export const postController = ({ model }: ControllerOptions) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await model.create({ ...req.body });
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating resource", error);
      res.status(507).json({ error: "Error creating resource" });
    }
  };
};

export const putController = ({ model }: ControllerOptions) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await model.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true }
      );
      if (!data) res.status(404).json({ error: "Resource not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Error updating resource", error);
    }
  };
};

export const deleteController = ({ model }: ControllerOptions) => {
  return async (req: Request, res: Response) => {
    if (model === OrderModel) {
      const smsapi = new SMSAPI(process.env.SMS_API_TOKEN || "");
      try {
        const data = await model.findByIdAndDelete(req.params.id);
        await smsapi.sms.sendSms(
          `+48${data.phoneNumber.replace(/[ -]/g, "")}`,
          `Hey ${data.clientName}, your order number ${data.number} is ready for collection`
        );
        res.json({ message: "Resource deleted successfully" });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const data = await model.findByIdAndDelete(req.params.id);
        if (!data) res.status(404).json({ error: "Resource not found" });
        res.json({ message: "Resource deleted successfully" });
      } catch (error) {
        console.error("Error deleting resource", error);
      }
    }
  };
};

export const getCurrencyController = async (_: Request, res: Response) => {
  try {
    const data = await RestaurantModel.find();
    res.status(200).json(data[0].currency);
  } catch (error) {
    console.error("An error occurred while retrieving data", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
