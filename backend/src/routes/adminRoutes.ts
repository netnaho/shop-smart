import { Router } from "express";
import {
  changeStatus,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getAllOrders,
  getAllProducts,
  getAllUsers,
} from "../controllers/adminController";
import { upload } from "../middleware/uploadMiddleware";

export const adminRoutes = Router();

adminRoutes.post("/post-product", upload.single("image"), createProduct);
adminRoutes.post("/post-category", upload.single("image"), createCategory);
adminRoutes.post("/delete-category/:id/", deleteCategory);
adminRoutes.post("/delete-product/:prod_id/:cat_id", deleteProduct);
adminRoutes.get("/get-orders", getAllOrders);
adminRoutes.post("/change-status", changeStatus);
adminRoutes.get("/get-users", getAllUsers);
adminRoutes.get("/all-products", getAllProducts);
