import { Router } from "express";
import { createCategory, createProduct } from "../controllers/adminController";
import { upload } from "../middleware/uploadMiddleware";

export const adminRoutes = Router();

adminRoutes.post("/post-product", upload.single("image"), createProduct);
adminRoutes.post("/post-category", upload.single("image"), createCategory);
