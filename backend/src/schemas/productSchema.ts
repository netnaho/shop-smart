import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Interface for TypeScript typing
export interface IProduct extends Document {
  name: string;
  image: string;
  availableQuantity: number;
  category: Types.ObjectId;
  price: number;
  value: number;
}

// Mongoose schema definition
const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  availableQuantity: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  value: { type: Number, default: 0 },
});

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
export default ProductModel;
