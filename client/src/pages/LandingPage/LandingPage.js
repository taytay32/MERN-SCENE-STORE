import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.scss";
import Product from "../../components/product/Product";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import { listProducts } from "../../redux/actions/productActions";

const LandingPage = () => {
  //call the state from store
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  //deconstruct the state
  const { loading, error, products } = productList;

  //hook to dispatch redux action
  const dispatch = useDispatch();

  //dispatch the action
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
                <Product key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LandingPage;
