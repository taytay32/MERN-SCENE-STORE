import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.scss";
import Product from "../../components/product/Product";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import { listProducts } from "../../redux/actions/productActions";

const LandingPage = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <section className="landingPage">
            <h1 className="landingPage__title">PRODUCTS</h1>
            <div className="cards">
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LandingPage;
