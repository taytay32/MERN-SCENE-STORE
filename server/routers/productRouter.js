import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { authUser, isAdmin, generateToken } from "../utils.js";

const productRouter = express.Router();

const serverAddress = "http://localhost:5000";

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

/* =======================
 * POST NEW PRODUCT
 * ======================= */
productRouter.post(
  "/",
  authUser,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "",
      type: "",
      category: "",
      image: "",
      price: 0,
      countInStock: 0,
      sizes: "",
      trackList: [],
      trackLength: [],
      description: "",
      releaseDate: "",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

/* =======================
 * PUT EDIT PRODUCT
 * ======================= */
productRouter.put(
  "/:id",
  authUser,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      req.body.image.slice(0, 4) === "http"
        ? (product.image = req.body.image)
        : req.body.image.slice(0, 2) === "/i"
        ? (product.image = req.body.image)
        : (product.image = `${serverAddress}${req.body.image}`);
      product.category = req.body.category;
      product.type = req.body.type;
      product.countInStock = req.body.countInStock;
      product.sizesOb = req.body.sizesOb;
      product.trackList = req.body.trackList;
      product.trackLength = req.body.trackLength;
      product.releaseDate = req.body.releaseDate;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

/* =======================
 * DELETE PRODUCT
 * ======================= */
productRouter.delete(
  "/:id",
  authUser,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ messsage: "Product not found" });
    }
  })
);

export default productRouter;
