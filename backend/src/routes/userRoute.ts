import express from "express";
import {
  createOrder,
  getCategories,
  getProducts,
  getUserInfo,
  getUserOrders,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { userAuthenticateAccessToken } from "../middleware/authenticateAccesstoken";
export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-categories", getCategories);
userRouter.get("/get-products", getProducts);
userRouter.post("/top-up-wallet");
userRouter.get("/user-info", userAuthenticateAccessToken, getUserInfo);
userRouter.post("/create-order", userAuthenticateAccessToken, createOrder);
userRouter.get("/get-user-orders", userAuthenticateAccessToken, getUserOrders);
