import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/gurthstore2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//PRODUCT SEED TO MONGODB
export const seedProducts = async () => {
  try {
    const products = data.products;

    products.forEach((product) => {
      Product.create(product);
    });

    console.log("Data successfully imported");
  } catch (error) {
    console.log(error);
  }
};

//USER SEED TO MONGODB
export const seedUsers = async () => {
  try {
    const users = data.users;

    users.forEach((user) => {
      User.create(user);
    });

    console.log("Data successfully imported");
  } catch (error) {
    console.log(error);
  }
};

// seedUsers();
// seedProducts();
