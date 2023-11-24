import mongoose from "mongoose";

const Order = new mongoose.Schema(
  {
    sdt: [{ type: Number }],
    duong: { type: String },
    huyen: { type: String },
    tp: { type: String },
    status: { type: Boolean },
    products: [
      {
        info: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
    user: { type: String, ref: "User" },
  },
  { timestamps: true },
  { collection: "Order" }
);

const OrderModel = mongoose.model("Order", Order);

export default OrderModel;
