import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for TypeScript typing
export interface Admin extends Document {
  username: string;
  password: string;
}

// Mongoose schema definition
const adminSchema: Schema<Admin> = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const AdminModel: Model<Admin> = mongoose.model<Admin>("Admin", adminSchema);
export default AdminModel;
