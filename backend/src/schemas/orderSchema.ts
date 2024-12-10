import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface CartItem {
  product: Types.ObjectId;
  quantity: number;
}

// Interface for TypeScript typing
export interface IOrder extends Document {
  user: Types.ObjectId;
  cartItems: CartItem[];
  totalPrice: number;
}

// Mongoose schema definition
const orderSchema: Schema<IOrder> = new mongoose.Schema({
  user: { types: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartItems: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
  },
  totalPrice: { type: Number },
});

const OrderModel: Model<IOrder> = mongoose.model<IOrder>(
  "Order",
  orderSchema
);
export default OrderModel;
