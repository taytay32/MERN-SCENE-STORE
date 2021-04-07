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

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
// const productIds = cartItems.map((item) => {
//   return item.productId;
// });

//update inventory
export const updateInventory = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);

  // const productId = req.body.orderItems.map((item) => {
  //   return item.productId;
  // });
  // console.log("from map", productId);
  // const product = await Product.findById(productId);

  for (let i = 0; i < req.body.orderItems.length; i++) {
    // const productId = req.body.orderItems[i].productId;
    console.log(req.body.orderItems[i].productId);
    // const product = await Product.findById(productId);

    const product = await Product.findById(req.body.orderItems[i].productId);

    console.log("product log ", product);
    const qty = req.body.orderItems[i].qty;
    const size = req.body.orderItems[i].size;
    const type = req.body.orderItems[i].type;
    // console.log(req.body.orderItems[i].qty);
    // console.log(req.body.orderItems[i].size);
    // console.log(req.body.orderItems[i].type);

    if (type === "Button") {
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

    // console.log("updated product", updatedProduct);
  }

  next();
});

// orderItems.map() return id

// } else {
//   res.status(404).send({ message: "Order Not Found" });
// }
