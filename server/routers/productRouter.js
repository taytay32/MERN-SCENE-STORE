import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

/* =======================
 * GET PRODUCTS
 * ======================= */
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

/* =======================
 * SEED PRODUCTS TO DB
 * ======================= */
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //remove before adding new
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ products: createdProducts });
  })
);

/* =======================
 * GET PRODUCT DETAILS
 * ======================= */
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
