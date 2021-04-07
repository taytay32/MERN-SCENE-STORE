import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.scss";
import Product from "../../components/product/Product";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import { listProducts } from "../../redux/actions/productActions";

const LandingPage = () => {
  //PULL IN FROM STORE
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchProduct = useSelector((state) => state.searchProduct);

  const dispatch = useDispatch();

  //PULL IN PRODUCTS
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //SEARCH FUNCTIONALITY
  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter((product) => {
          return product.name
            .toLowerCase()
            .includes(searchProduct.toLowerCase());
        })
      );
    }
  }, [products, searchProduct]);

  return (
    <>
      <section className="landingPage">
        <h1 className="landingPage__title">PRODUCTS</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="cards">
              {filteredProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default LandingPage;
