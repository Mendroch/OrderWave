import { Request, Response } from "express";
import { Model } from "mongoose";

interface ControllerOptions {
  model: Model<any>;
}
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

export const dishPostController = ({ model }: ControllerOptions) => {
  return async (req: Request, res: Response) => {
    const dish = new model({ ...req.body });
    saveImage(dish, req.body.picture);

    try {
      const data = await model.create({ ...req.body });
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating resource", error);
      res.status(507).json({ error: "Error creating resource" });
    }
  };
};

function saveImage(elem: any, imageEncoded: any) {
  if (imageEncoded == null) return;
  const image = JSON.parse(imageEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    elem.picture = Buffer.from(image.data, "base64");
    elem.pictureType = image.type;
  }
}
