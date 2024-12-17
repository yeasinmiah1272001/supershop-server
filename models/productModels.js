import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: Array, require: true },
  price: { type: Number, required: true },
  oldprice: { type: Number, required: true },
  category: { type: String, required: true },
  offer: { type: Boolean, default: false },
  author: { type: String },
  SKU: { type: String, require: true },
  rating: { type: Number },
  description: { type: String, require: true },
});

const productModels =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModels;
