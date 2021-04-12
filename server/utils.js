import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Product from "./models/productModel.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

//AUTH USER
export const authUser = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    //ISOLATE TOKEN OF REQUEST FROM HEADER
    const token = authHeaders.slice(7, authHeaders.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

//CHECK IF ADMIN
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

//UPDATE INVENTORY MIDDLEWARE ON ORDER POST REQUEST
export const updateInventory = expressAsyncHandler(async (req, res, next) => {
  for (let i = 0; i < req.body.orderItems.length; i++) {
    const product = await Product.findById(req.body.orderItems[i].productId);
    const qty = req.body.orderItems[i].qty;
    const size = req.body.orderItems[i].size;
    const type = req.body.orderItems[i].type;

    if (type === "Button") {
      product.countInStock = product.countInStock - qty;
      const updatedProduct = await product.save();
    }

    if (type === "Music") {
      product.countInStock = product.countInStock - qty;
      const updatedProduct = await product.save();
    }

    if (type === "Apparel") {
      if (size === "S") {
        product.sizesOb = {
          ...product.sizesOb,
          S: product.sizesOb.S - Number(qty),
        };
      }
      if (size === "M") {
        product.sizesOb = {
          ...product.sizesOb,
          S: product.sizesOb.M - Number(qty),
        };
      }

      if (size === "L") {
        product.sizesOb = {
          ...product.sizesOb,
          S: product.sizesOb.L - Number(qty),
        };
      }
      if (size === "XL") {
        product.sizesOb = {
          ...product.sizesOb,
          S: product.sizesOb.M - Number(qty),
        };
      }

      const updatedProduct = await product.save();
    }
  }

  next();
});
