import { Request, Response } from "express";
import ProductModel from "../schemas/productSchema";
import { uploadToCloudinary } from "../utils/uploadCloudinary";
import CategoryModel from "../schemas/categorySchema";

export const createProduct = async (req: Request, res: Response) => {
  const { name, availableQuantity, category, price } = req.body;
  try {
    if (!req.file) {
      res.status(400).json({ message: "No image uploaded" });
      return;
    }
    const imageData = await uploadToCloudinary(req.file.buffer);
    const image = imageData.imageUrl;
    const product = await ProductModel.create({
      name,
      image,
      availableQuantity,
      category,
      price,
    });
    const getUpdatedProducts = await ProductModel.find({ category: category });
    res.status(200).json(getUpdatedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    if (!req.file) {
      res.status(400).json({ message: "No image uploaded" });
      return;
    }
    const imageData = await uploadToCloudinary(req.file.buffer);
    const image = imageData.imageUrl;
    const category = await CategoryModel.create({
      name,
      image,
    });
    const updatedCategories = await CategoryModel.find({});
    res.status(200).json(updatedCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const category_id = req.params.id;
  console.log(category_id, "id");
  try {
    await CategoryModel.findByIdAndDelete(category_id);
    const updatedCategories = await CategoryModel.find({});
    res.status(200).json(updatedCategories);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error });
  }
};
