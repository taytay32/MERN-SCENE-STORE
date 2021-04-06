import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    imageDetail: { type: String, required: false },
    sizes: { type: Array, required: false },
    releaseDate: { type: String, required: false },
    artwork: { type: String, required: false },
    trackList: { type: Array, required: false },
    trackLength: { type: Array, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
