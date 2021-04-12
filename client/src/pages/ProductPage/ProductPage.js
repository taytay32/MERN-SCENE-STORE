import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../components/boxes/MessageBox";
import LoadingBox from "../../components/boxes/LoadingBox";
import { selectedProduct } from "../../redux/actions/productActions";

import "./ProductPage.scss";
import { addToCart } from "../../redux/actions/cartActions";

const ProductPage = (props) => {
  //PULL IN FROM STORE
  const productSelected = useSelector((state) => state.productSelected);
  const { loading, error, product } = productSelected;

  const dispatch = useDispatch();

  //to pass through dispatch
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // dispatch the action
  useEffect(() => {
    dispatch(selectedProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty, size, product.sizesOb));
    props.history.push(`/cart`);
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
            <h2 className="selectedProduct__title">{product.name}</h2>
            <div className="selectedProduct__container">
              <div className="selectedProduct__imgsContainer">
                {product.imageDetail ? (
                  <div className="selectedProduct__imgContainer">
                    <img
                      src={product.imageDetail}
                      alt={product.name}
                      className="selectedProduct__img"
                    />
                  </div>
                ) : (
                  <div className="selectedProduct__imgContainer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="selectedProduct__img"
                    />
                  </div>
                )}
              </div>
              <div className="selectedProduct__info">
                {product.type === "Button" && (
                  <>
                    <div className="description">
                      <p className="description__price">${product.price}</p>
                      <p className="description__description">
                        {product.description}
                      </p>
                    </div>
                    <div className="productDetails">
                      <div className="status">
                        <h2 className="status__title">Status</h2>
                        <div className="status__status">
                          {product.countInStock > 0 ? (
                            <span className="status__status__success">
                              In Stock
                            </span>
                          ) : (
                            <span className="status__status__error">
                              Out Of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="qtyContainer">
                        <label
                          className="qtyContainer__label"
                          htmlFor="quantity"
                        >
                          QTY
                        </label>
                        <select
                          className="qtyContainer__select"
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

                      <div className="addToCart">
                        <button
                          className="addToCart__btn"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {product.type === "Tab" && (
                  <>
                    <div className="description">
                      <p className="description__price">${product.price}</p>
                      <p className="description__description">
                        {product.description}
                      </p>
                    </div>
                    <div className="productDetails">
                      <div className="status">
                        <h2 className="status__title">Status</h2>
                        <div className="status__status">
                          <span className="status__status__success">
                            In Stock
                          </span>
                        </div>
                      </div>

                      <div className="addToCart">
                        <button
                          className="addToCart__btn"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {product.type === "Music" && (
                  <>
                    <div className="description">
                      <p className="description__price">${product.price}</p>
                      <p className="description__description">
                        {product.description}
                      </p>

                      <p className="description__release">
                        Released: {product.releaseDate}
                      </p>

                      <div className="tracklistContainer">
                        <h2 className="tracklistContainer__title">Tracklist</h2>
                        <ul className="tracklistContainer__tracklist">
                          {product.trackList.map((track) => {
                            return (
                              <li
                                className="tracklistContainer__tracklist__track"
                                key={track}
                              >
                                {track}
                              </li>
                            );
                          })}
                        </ul>
                        <ul className="tracklistContainer__trackLength">
                          {product.trackLength.map((track) => {
                            return (
                              <li
                                className="tracklistContainer__trackLength__length"
                                key={track}
                              >
                                {track}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="productDetails">
                      <div className="status">
                        <h2 className="status__title">Status</h2>
                        <div className="status__status">
                          {product.countInStock > 0 ? (
                            <span className="status__status__success">
                              In Stock
                            </span>
                          ) : (
                            <span className="status__status__error">
                              Out Of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="qtyContainer">
                        <label
                          className="qtyContainer__label"
                          htmlFor="quantity"
                        >
                          QTY
                        </label>
                        <select
                          className="qtyContainer__select"
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

                      <div className="addToCart">
                        <button
                          className="addToCart__btn"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {product.type === "Apparel" && (
                  <>
                    <div className="description">
                      <p className="description__price">${product.price}</p>
                      <p className="description__description">
                        {product.description}
                      </p>
                    </div>

                    <div className="productDetails">
                      <div className="status">
                        <h2 className="status__title">Status</h2>
                        <div className="status__status">
                          {product.sizesOb.S !== 0 ||
                          product.sizesOb.M !== 0 ||
                          product.sizesOb.L !== 0 ||
                          product.sizesOb.XL !== 0 ? (
                            <span className="status__status__success">
                              In Stock
                            </span>
                          ) : (
                            <span className="status__status__error">
                              Out Of Stock
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sizeQtyContainer">
                        <div className="sizeContainer">
                          <label className="qtyContainer__label" htmlFor="size">
                            SIZE
                          </label>

                          <select
                            className="qtyContainer__select"
                            name="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          >
                            {Object.keys(product.sizesOb).map((size) => {
                              return (
                                <option key={size} name="size">
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="qtyContainerApparel">
                          <label
                            className="qtyContainer__label"
                            htmlFor="quantity"
                          >
                            QTY
                          </label>
                          <select
                            className="qtyContainer__select"
                            name="quantity"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {size === "S" &&
                              [...Array(product.sizesOb.S).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {size === "M" &&
                              [...Array(product.sizesOb.M).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {size === "L" &&
                              [...Array(product.sizesOb.L).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            {size === "XL" &&
                              [...Array(product.sizesOb.XL).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="addToCart">
                        <button
                          className="addToCart__btn"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <div className="backToProducts">
                  <Link className="backToProducts__link" to="/">
                    Back to products
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductPage;
