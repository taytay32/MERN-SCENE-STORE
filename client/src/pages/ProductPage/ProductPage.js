import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../components/boxes/MessageBox";
import LoadingBox from "../../components/boxes/LoadingBox";
import { selectedProduct } from "../../redux/actions/productActions";

import "./ProductPage.scss";

const ProductPage = (props) => {
  //call the state from store
  const productSelected = useSelector((state) => state.productSelected);
  console.log(productSelected);
  //deconstruct the state
  const { loading, error, product } = productSelected;

  //hook to dispatch redux action
  const dispatch = useDispatch();

  //getID to feed to backend
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  //dispatch the action
  useEffect(() => {
    dispatch(selectedProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}=size=${size}`);
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <section className="selectedProduct">
            <h2 className="title">{product.name}</h2>
            <div className="img">
              <img
                src={product.imageDetail}
                alt={product.name}
                className="img__img"
              />
            </div>
            <div className="description">
              <p className="description__price">${product.price}</p>
              <p className="description__description">{product.description}</p>
              {product.type === "music" && (
                <>
                  <p className="description__release">
                    Released: {product.releaseDate}
                  </p>

                  <div className="trackFlex">
                    <h2 className="trackFlex__title">Tracklist</h2>
                    <ul className="trackFlex__tracklist">
                      {product.trackList.map((track) => {
                        return (
                          <li className="trackFlex__tracklist__track">
                            {track}
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="trackFlex__trackLength">
                      {product.trackLength.map((track) => {
                        return (
                          <li className="trackFlex__trackLength__length">
                            {track}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="details">
              <div className="status">
                <h2 className="status__title">Status</h2>
                <div className="status__status">
                  {product.type === "tab" || product.countInStock > 0 ? (
                    <span className="status__status__success">In Stock</span>
                  ) : (
                    <span className="status__status__error">Out Of Stock</span>
                  )}
                </div>
              </div>
              {product.countInStock > 0 && (
                <>
                  <div className="sizenqty">
                    <div className="qtyWrap">
                      <label className="lab" htmlFor="quantity">
                        QTY
                      </label>
                      <select
                        className="select"
                        name="quantity"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    {product.type === "apparel" ? (
                      <>
                        <div className="sizeWrap">
                          <label className="lab" htmlFor="size">
                            SIZE
                          </label>

                          <select
                            className="select"
                            name="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          >
                            {product.sizes.map((size) => {
                              return (
                                <option key={size} name="size">
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="addToCart">
                    <button
                      className="addToCart__btn"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </div>
                </>
              )}

              {product.type === "tab" && (
                <>
                  <div className="addToCart">
                    <button
                      className="addToCart__btn"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </div>
                </>
              )}
            </div>
            <Link to="/">Back to products</Link>
          </section>
        </>
      )}
    </>
  );
};

export default ProductPage;
