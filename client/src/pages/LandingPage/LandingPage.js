import React from "react";

import "./LandingPage.scss";

import data from "../../data";
import Product from "../../components/product/Product";

const LandingPage = () => {
  console.log(data);
  return (
    <section className="landingPage">
      <h1 className="landingPage__title">PRODUCTS</h1>
      <div className="cards">
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
