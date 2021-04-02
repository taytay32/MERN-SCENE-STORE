import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/gurthstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());

// /* =======================
//  * GET PRODUCTS
//  * ======================= */
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

// /* =======================
//  * GET SPECIFIC PRODUCT
//  * ======================= */
// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((product) => {
//     return product.id === req.params.id;
//   });
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({
//       message: "Product not found",
//     });
//   }
// });

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

//CATCH ERRORS FOR USER SEED
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

//PORT SETUP
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
