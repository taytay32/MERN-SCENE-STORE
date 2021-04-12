import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/gurthstore2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());

//ROUTES
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
//RETURN PAYPAL CLIENT ID
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

//PORT SETUP
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
