import express from "express";
import {
  getCategories,
  getProducts,
  getUserInfo,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { userAuthenticateAccessToken } from "../middleware/authenticateAccesstoken";
export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-categories", userAuthenticateAccessToken, getCategories);
userRouter.get("/get-products", userAuthenticateAccessToken, getProducts);
userRouter.post("/top-up-wallet");
userRouter.get("/user-info", userAuthenticateAccessToken, getUserInfo);
