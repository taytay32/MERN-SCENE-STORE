import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
import path from "path";

import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL
    : "mongodb://localhost/gurthstore2";

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(error);
    } else {
      console.log("Connected to database");
    }
  }
);

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

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  //serve frontend
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/build")));
  //serve index.html
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  );
}

//PORT SETUP
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
