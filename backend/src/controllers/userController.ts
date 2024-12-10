import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ClientModel from "../schemas/userSchema";
import CategoryModel from "../schemas/categorySchema";
import ProductModel from "../schemas/productSchema";
import { getAccessToken } from "../utils/tokens";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: Object | JwtPayload;
}

export const registerUser = async (req: Request, res: Response) => {
  const { fullname, age, location, phone, email, password } = req.body;
  try {
    const response = await ClientModel.create({
      name: fullname,
      age,
      location,
      phone,
      email,
      password,
    });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const emailExists = await ClientModel.findOne({ email: email });
    console.log(emailExists);
    if (!emailExists) {
      throw new Error("Email doesn't exist");
    }
    const user = await ClientModel.findOne({ email });
    const userPassword = user?.password;
    if (userPassword !== undefined)
      if (password !== userPassword) {
        throw new Error("Invalid password");
      }
    const token = await getAccessToken({
      user: user,
    }); // get access token
    console.log("token is:", token);
    res.cookie("token", token, {
      httpOnly: true, // only from http not from the javascript
      secure: false,
      // sameSite: "none", // check wether it is in production or development
      maxAge: 7 * 24 * 60 * 60 * 1000, // token live only for 24 hours
    });
    res.status(200).json({ message: "login success", token: token });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const topUpWallet = async (req: AuthenticatedRequest, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  try {
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
