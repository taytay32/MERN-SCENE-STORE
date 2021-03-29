import React from "react";
import { Link } from "react-router-dom";
import data from "../../data";
import "./ProductPage.scss";
import check from "../../assets/icons/check.svg";
import ex from "../../assets/icons/ex.svg";

const ProductPage = (props) => {
  console.log(data);

  const selectedProduct = data.products.find(
    (product) => product.id === props.match.params.id
  );
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <section className="selectedProduct">
      <h2 className="title">{selectedProduct.name}</h2>
      <div className="img">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="img__img"
        />
      </div>
      <div className="description">
        <p className="description__price">${selectedProduct.price}</p>
        <p className="description__description">
          {selectedProduct.description}
        </p>
      </div>
      <div className="details">
        <div className="status">
          <h2 className="status__title">Status</h2>
          <div className="status__status">
            {selectedProduct.countInStock > 0 ? (
              <span className="status__status__success">In Stock</span>
            ) : (
              <span className="status__status__error">Out Of Stock</span>
            )}
          </div>
        </div>
        <div className="addToCart">
          <button className="addToCart__btn">Add To Cart</button>
        </div>
      </div>
      <Link to="/">Back to products</Link>
    </section>
  );
};

export default ProductPage;
