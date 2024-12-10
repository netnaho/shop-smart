import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for TypeScript typing
export interface ICategory extends Document {
  name: string;
  image: string;
}

// Mongoose schema definition
const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
});

const CategoryModel: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);
export default CategoryModel;
