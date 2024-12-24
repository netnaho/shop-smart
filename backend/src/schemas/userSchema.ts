import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for TypeScript typing
export interface Client extends Document {
  name?: string;
  email?: string;
  phone: string;
  age: number;
  password: string;
  location: string;
  wallet: number;
  profilePicture?: string; // Optional field for profile picture URL
  verificationId: string;
  isRegistered: boolean;
  refreshToken?: string;
}

// Mongoose schema definition
const userSchema: Schema<Client> = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  age: { type: Number },
  password: { type: String },
  location: { type: String },
  wallet: { type: Number, default: 0 },
  profilePicture: { type: String }, // Field for profile picture URL
  verificationId: { type: String },
  isRegistered: { type: Boolean, default: false },
  refreshToken: { type: String },
});

const ClientModel: Model<Client> = mongoose.model<Client>("User", userSchema);
export default ClientModel;
