import mongoose from "mongoose";

const cartCollection = "cart"

export const cartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    price: { type :Number, required : true}
     },
  {timestamps : true}
  
  );

  const CartModel = mongoose.model(cartSchema,cartCollection);
  module.exports = {CartModel};