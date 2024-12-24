import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ClientModel from "../schemas/userSchema";
import CategoryModel from "../schemas/categorySchema";
import ProductModel from "../schemas/productSchema";
import { getAccessToken } from "../utils/tokens";
import jwt, { JwtPayload } from "jsonwebtoken";
import OrderModel from "../schemas/orderSchema";
import axios from "axios";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

interface ClientOTPRequestProps {
  phoneNumber: string;
}

const afroMessageSecurityCodeSendURI =
  process.env.AFROMESSAGE_SECURITY_CODE_SEND_URL ||
  `https://api.afromessage.com/api/challenge`;
const afroMessageSecurityCodeVerifyURI =
  process.env.AFROMESSAGE_SECURITY_CODE_VERIFY_URL ||
  `https://api.afromessage.com/api/verify`;
const YOUR_IDENTIFIER = process.env.AFROMESSAGE_IDENTIFIER;
const YOUR_SENDER_NAME = process.env.AFROMESSAGE_PICK_SENDER_NAME;
const MESSAGE_PREFIX = "Your OTP is:";
const MESSAGE_POSTFIX = "";
const SPACES_BEFORE = 1;
const SPACES_AFTER = 0;
const EXPIRATION_VALUE = 120;
const CODE_LENGTH = 4;
const CODE_TYPE = 0;

export async function sendOTPCodePick({ phoneNumber }: ClientOTPRequestProps) {
  try {
    console.log(process.env.AFROMESSAGE_API_KEY);
    const response = await axios.get(afroMessageSecurityCodeSendURI, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiamc0YlBSbEhQeGhnd0J2d2FhOXhPejFCdTU5ejh3Wm0iLCJleHAiOjE4NTU5OTYxOTIsImlhdCI6MTY5ODE0MzM5MiwianRpIjoiNDM5MTE4NDItYjQ1MC00NmI3LTg4NjEtYWIzNzI4MThlMjA0In0.kXLcS_IiWn3_0skPfrvQe321q1PhbcR57J4N2lPBIZo`,
        "Content-Type": "application/json",
      },
      params: {
        from: "e80ad9d8-adf3-463f-80f4-7c4b39f7f164",
        sender: "KetemeTech",
        to: phoneNumber,
        pr: MESSAGE_PREFIX,
        ps: MESSAGE_POSTFIX,
        sb: SPACES_BEFORE,
        sa: SPACES_AFTER,
        ttl: EXPIRATION_VALUE,
        len: CODE_LENGTH,
        t: CODE_TYPE,
      },
    });
    console.log("otp sent");
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.message;
  }
}

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await ClientModel.findOne({ email: email }).exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(user);
    const response = await axios.get(`https://api.afromessage.com/api/verify`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiamc0YlBSbEhQeGhnd0J2d2FhOXhPejFCdTU5ejh3Wm0iLCJleHAiOjE4NTU5OTYxOTIsImlhdCI6MTY5ODE0MzM5MiwianRpIjoiNDM5MTE4NDItYjQ1MC00NmI3LTg4NjEtYWIzNzI4MThlMjA0In0.kXLcS_IiWn3_0skPfrvQe321q1PhbcR57J4N2lPBIZo`,
        "Content-Type": "application/json",
      },
      params: {
        to: user.phone,
        vc: user.verificationId,
        code: otp,
      },
    });
    if (response.data.acknowledge != "success") {
      res.status(400).json({ response: response.data, message: "Invalid OTP" });
      return;
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
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await ClientModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const phone = user.phone;
    const response = await sendOTPCodePick({ phoneNumber: phone });
    const verification_id = response.response.verificationId;
    const UserResponse = await ClientModel.findByIdAndUpdate(user._id, {
      verificationId: verification_id,
    });
    console.log(UserResponse);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
  const { category_id } = req.query;
  try {
    const products = await ProductModel.find({
      category: category_id,
    }).populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const topUpWallet = async (req: AuthenticatedRequest, res: Response) => {
  const { amount } = req.body;
  const user_id = req.user?.user?._id;
  try {
    const updatedUser = await ClientModel.findByIdAndUpdate(
      user_id,
      {
        $inc: { wallet: amount },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user?.user?._id;
  try {
    // console.log(user);
    const newUserData = await ClientModel.find({ _id: user_id });
    res.status(200).json(newUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { cart_items, total_price } = req.body;
  try {
    const user_id = req.user?.user?._id;
    const response = await OrderModel.create({
      user: user_id,
      cartItems: cart_items,
      totalPrice: total_price,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user_id = req.user?.user?._id;
    const userOrders = await OrderModel.find({ user: user_id }).populate(
      "cartItems.product"
    );
    res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error });
  }
};

export const purchaseOrder = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { order_id, order_price } = req.body;
  const user_id = req.user?.user?._id;
  try {
    await ClientModel.findByIdAndUpdate(user_id, {
      $inc: { wallet: -order_price },
    });
    await OrderModel.findByIdAndUpdate(order_id, {
      status: "paid",
    });
    const updatedOrders = await OrderModel.find({ user: user_id }).populate(
      "cartItems.product"
    );
    res.status(200).json(updatedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
