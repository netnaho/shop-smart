import express from "express";
import {
  createOrder,
  getCategories,
  getProducts,
  getUserInfo,
  getUserOrders,
  loginUser,
  purchaseOrder,
  registerUser,
  sendOtp,
  topUpWallet,
  verifyOtp,
} from "../controllers/userController";
import { userAuthenticateAccessToken } from "../middleware/authenticateAccesstoken";
export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-categories", getCategories);
userRouter.get("/get-products", getProducts);
userRouter.post("/top-up-wallet", userAuthenticateAccessToken, topUpWallet);
userRouter.get("/user-info", userAuthenticateAccessToken, getUserInfo);
userRouter.post("/create-order", userAuthenticateAccessToken, createOrder);
userRouter.get("/get-user-orders", userAuthenticateAccessToken, getUserOrders);
userRouter.post("/pay-for-order", userAuthenticateAccessToken, purchaseOrder);

userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
