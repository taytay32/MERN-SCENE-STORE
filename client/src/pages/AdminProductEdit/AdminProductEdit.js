import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Register/Register.scss";
import "./AdminProductEdit.scss";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import {
  selectedProduct,
  updateProduct,
} from "../../redux/actions/productActions.js";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";
import axios from "../../../node_modules/axios/index";

const AdminProductEdit = (props) => {
  const productId = props.match.params.id;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [trackList, setTrackList] = useState("");
  const [trackLength, setTrackLength] = useState("");

  const productSelected = useSelector((state) => state.productSelected);
  const { loading, error, product } = productSelected;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(selectedProduct(productId));
    } else {
      setName(product.name);
      setType(product.type);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setSizes(product.sizes);
      setTrackList(product.trackList);
      setTrackLength(product.trackLength);
    }
  }, [product, dispatch, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image);
    //dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        type,
        category,
        countInStock,
        description,
        sizes,
        trackList,
        trackLength,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();

    bodyFormData.append("image", file);

    setLoadingUpload(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/uploads`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("2", data);
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <section className="register">
      <form className="submit" action="submit" onSubmit={submitHandler}>
        <h1 className="submit__title">Edit Product</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="inputs">
          <label className="inputs__label" htmlFor="name">
            Name
          </label>
          <input
            className="inputs__input"
            type="text"
            id="name"
            placeholder="Enter product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="inputs__label" htmlFor="price">
            Price
          </label>
          <input
            className="inputs__input"
            type="text"
            id="price"
            placeholder="Enter price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label className="inputs__label image__label" htmlFor="image">
            Image
          </label>
          <input
            className="inputs__input image__input"
            type="text"
            id="image"
            placeholder="Enter image url"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div>
            <label className="inputs__label" htmlFor="imageFile">
              Image File
            </label>
            <input
              className="inputs__input"
              type="file"
              id="imageFile"
              label="Choose Image"
              onChange={uploadFileHandler}
            />
          </div>
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && (
            <MessageBox variante="danger">{errorUpload}</MessageBox>
          )}

          <label className="inputs__label" htmlFor="type">
            Type
          </label>
          <select
            className="inputs__input"
            // type="text"
            id="type"
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option></option>
            <option value="Apparel">Apparel</option>
            <option value="Music">Music</option>
            <option value="Tab">Tab</option>
            <option value="Button">Button</option>

            {/* {type === "Apparel" ? (
              <>
                <option value={type}>{type}</option>
                <option value="Music">Music</option>
                <option value="Tab">Tab</option>
                <option value="Button">Button</option>
              </>
            ) : type === "Music" ? (
              <>
                <option value={type}>{type}</option>
                <option value="Apparel">Apparel</option>
                <option value="Tab">Tab</option>
                <option value="Button">Button</option>
              </>
            ) : type === "Tab" ? (
              <>
                <option value="Apparel">Apparel</option>
                <option value="Music">Music</option>
                <option value="Button">Button</option>
              </>
            ) : type === "Button" ? (
              <>
                <option value="Apparel">Apparel</option>
                <option value="Tab">Tab</option>
                <option value="Music">Music</option>
              </>
            ) : (
              ""
            )} */}
          </select>
          {product && product.type === "Apparel" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Hoodies">Hoodies</option>
                <option value="Tees">Tees</option>
                <option value="Tanks">Tanks</option>
              </select>

              {/* <h3 className="inputs__label sizeTitle">Sizes</h3>
              <div className="sizesCont">
                <div>
                  <label className="inputs__label CB" htmlFor="S">
                    S
                  </label>
                  <input
                    className="inputs__checkbox"
                    type="checkbox"
                    id="S"
                    onChange={(e) => setSizes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="inputs__label CB" htmlFor="M">
                    M
                  </label>
                  <input
                    className="inputs__checkbox"
                    type="checkbox"
                    id="M"
                    onChange={(e) => setSizes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="inputs__label CB" htmlFor="L">
                    L
                  </label>
                  <input
                    className="inputs__checkbox"
                    type="checkbox"
                    id="L"
                    onChange={(e) => setSizes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="inputs__label CB" htmlFor="XL">
                    XL
                  </label>
                  <input
                    className="inputs__checkbox"
                    type="checkbox"
                    id="XL"
                    onChange={(e) => setSizes(e.target.value)}
                  />
                </div>
              </div> */}
            </>
          )}

          {/* {product && product.type === "Music" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="CD">CD</option>
                <option value="Vinyl">Vinyl</option>
              </select>

              <label className="inputs__label" htmlFor="trackList">
                Track List
              </label>
              <input
                className="inputs__input"
                type="text"
                id="trackList"
                value={trackList}
                placeholder="Enter track list eg: 1. Song1, 2. Song2"
                onChange={(e) => setTrackList(e.target.value)}
              />

              <label className="inputs__label" htmlFor="trackLength">
                Track Length
              </label>
              <input
                className="inputs__input"
                type="text"
                id="trackLength"
                value={trackLength}
                placeholder="Enter track length eg: 1. 3:30, 2. 4:24"
                onChange={(e) => setTrackLength(e.target.value)}
              />
            </>
          )} */}
          {/* {product && product.type === "Tab" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="digital download">Digital Download</option>
                <option value="book">Book</option>
              </select>
            </>
          )}
          {product && product.type === "button" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="buttons">Buttons</option>
              </select>
            </>
          )} */}

          <label className="inputs__label" htmlFor="countInStock">
            Count In Stock
          </label>
          <input
            className="inputs__input"
            type="text"
            id="countInStock"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <label className="inputs__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="inputs__input descripText"
            type="text"
            id="description"
            rows="3"
            value={description}
            placeholder="Enter description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="registerButton updateBtn" type="submit">
          Update
        </button>
      </form>
    </section>
  );
};

export default AdminProductEdit;
