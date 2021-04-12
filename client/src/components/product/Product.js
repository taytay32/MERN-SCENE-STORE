import React from "react";
import "../../pages/LandingPage/LandingPage.scss";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <div className="card__imgContainer">
          <img src={product.image} alt={product.name} className="card__img" />
        </div>
        <div className="card__info">
          <h2 className="card__title">{product.name}</h2>
          <p className="card__price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
