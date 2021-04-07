import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    type: { type: String, required: false },
    category: { type: String, required: false },
    image: { type: String, required: false },
    imageDetail: { type: String, required: false },
    sizes: { type: Array, required: false },
    sizesOb: { type: Object, required: false },
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
