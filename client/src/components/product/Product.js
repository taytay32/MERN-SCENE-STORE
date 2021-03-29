import React from "react";
import "../../pages/LandingPage/LandingPage.scss";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card" key={product.id}>
      <Link to={`/product/${product.id}`}>
        <div className="img">
          <img src={product.image} alt={product.name} className="img__img" />
        </div>
        <div className="info">
          <h2 className="info__title">{product.name}</h2>
          <p className="info__price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
