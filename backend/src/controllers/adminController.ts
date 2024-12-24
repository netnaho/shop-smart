import { Request, Response } from "express";
import ProductModel from "../schemas/productSchema";
import { uploadToCloudinary } from "../utils/uploadCloudinary";
import CategoryModel from "../schemas/categorySchema";
import OrderModel from "../schemas/orderSchema";
import ClientModel from "../schemas/userSchema";

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

export const deleteProduct = async (req: Request, res: Response) => {
  const product_id = req.params.prod_id;
  const category_id = req.params.cat_id;
  try {
    await ProductModel.findByIdAndDelete(product_id);
    const getUpdatedProducts = await ProductModel.find({
      category: category_id,
    });
    res.status(200).json(getUpdatedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find({})
      .populate("cartItems.product")
      .populate("user", "_id name");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  const { order_id, status } = req.body;
  try {
    if (status == "denied") {
      const currentOrder = await OrderModel.findById(order_id);
      if (currentOrder?.status == "paid") {
        const order = await OrderModel.findByIdAndUpdate(
          order_id,
          {
            status: status,
          },
          { new: true }
        );
        const updateUser = await ClientModel.findByIdAndUpdate(order?.user, {
          $inc: { wallet: order?.totalPrice },
        });
        const updatedOrders = await OrderModel.find({})
          .populate("cartItems.product")
          .populate("user", "_id name");
        res.status(200).json(updatedOrders);
        return;
      } else {
        const order = await OrderModel.findByIdAndUpdate(
          order_id,
          {
            status: status,
          },
          { new: true }
        );
        const updatedOrders = await OrderModel.find({})
          .populate("cartItems.product")
          .populate("user", "_id name");
        res.status(200).json(updatedOrders);
        return;
      }
    }
    const order = await OrderModel.findByIdAndUpdate(
      order_id,
      {
        status: status,
      },
      { new: true }
    );
    // const user_id = order?.user;
    // const;
    const updatedOrders = await OrderModel.find({})
      .populate("cartItems.product")
      .populate("user", "_id name");
    res.status(200).json(updatedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await ClientModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
