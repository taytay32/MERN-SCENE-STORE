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

  //HOOKS TO ESTABLISH STATE
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [trackList, setTrackList] = useState("");
  const [trackLength, setTrackLength] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [sizeSmall, setSizeSmall] = useState("");
  const [sizeMedium, setSizeMedium] = useState("");
  const [sizeLarge, setSizeLarge] = useState("");
  const [sizeExtraLarge, setSizeExtraLarge] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  //IMPORT PRODUCTSELECTED FROM STORE
  const productSelected = useSelector((state) => state.productSelected);
  const { loading, error, product } = productSelected;

  //IMPORT UPDATEDPRODUCT FROM STORE
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  //IF  UPDATE - REDIRECT, OR DISPATCH PRODUCT AND REPOPULATE STATE
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
      if (product.type === "Apparel") {
        setSizeSmall(product.sizesOb.S);
        setSizeMedium(product.sizesOb.M);
        setSizeLarge(product.sizesOb.L);
        setSizeExtraLarge(product.sizesOb.XL);
      }

      setTrackList(product.trackList);
      setTrackLength(product.trackLength);
      setReleaseDate(product.releaseDate);
    }
  }, [product, dispatch, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    //PUT BODY
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
        sizesOb: {
          S: Number(sizeSmall),
          M: Number(sizeMedium),
          L: Number(sizeLarge),
          XL: Number(sizeExtraLarge),
        },

        trackList:
          typeof trackList === "string" ? trackList.split(",") : trackList,
        trackLength:
          typeof trackLength === "string"
            ? trackLength.split(",")
            : trackLength,
        releaseDate,
      })
    );
  };

  //IMPORT USERINFO FROM STORE
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  //UPLOAD FILE
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

      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <section className="productEdit">
      <h1 className="productEdit__title">Edit Product</h1>
      <form
        className="submit productEditForm"
        action="submit"
        onSubmit={submitHandler}
      >
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

          <label className="inputs__label" htmlFor="imageFile">
            New Image File
          </label>

          <input
            className="upload__input inputs__input"
            type="file"
            id="imageFile"
            label="Choose Image"
            onChange={uploadFileHandler}
          />

          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && (
            <MessageBox variante="danger">{errorUpload}</MessageBox>
          )}
          {product && image.length >= 1 && (
            <img
              className="uploadImg"
              src={
                image.slice(0, 8) === "/uploads"
                  ? `http://localhost:5000${image}`
                  : image
              }
              alt={product.name}
            />
          )}

          <label className="inputs__label" htmlFor="type">
            Type
          </label>
          <select
            className="inputs__input"
            id="type"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {!type && <option></option>}
            <option value="Apparel">Apparel</option>
            <option value="Music">Music</option>
            <option value="Tab">Tab</option>
            <option value="Button">Button</option>
          </select>
          {product && type === "Apparel" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                <option value="Hoodies">Hoodies</option>
                <option value="Tees">Tees</option>
                <option value="Tanks">Tanks</option>
              </select>

              <div className="sizesContainer">
                <div className="sizeHeadings">
                  <label className="inputs__label sizeHeading" htmlFor="small">
                    Small
                  </label>
                  <label className="inputs__label sizeHeading" htmlFor="medium">
                    Medium
                  </label>
                  <label className="inputs__label sizeHeading" htmlFor="large">
                    Large
                  </label>
                  <label
                    className="inputs__label sizeHeading"
                    htmlFor="extraLarge"
                  >
                    Extra Large
                  </label>
                </div>
                <div className="sizeInputs">
                  <input
                    className="inputs__input size__input"
                    type="text"
                    id="small"
                    placeholder="qty"
                    value={sizeSmall}
                    onChange={(e) => setSizeSmall(e.target.value)}
                  />
                  <input
                    className="inputs__input size__input"
                    type="text"
                    id="medium"
                    placeholder="qty"
                    value={sizeMedium}
                    onChange={(e) => setSizeMedium(e.target.value)}
                  />
                  <input
                    className="inputs__input size__input"
                    type="text"
                    id="large"
                    placeholder="qty"
                    value={sizeLarge}
                    onChange={(e) => setSizeLarge(e.target.value)}
                  />
                  <input
                    className="inputs__input size__input"
                    type="text"
                    id="extraLarge"
                    placeholder="qty"
                    value={sizeExtraLarge}
                    onChange={(e) => setSizeExtraLarge(e.target.value)}
                  />
                </div>
                <label className="inputs__label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="inputs__input descriptionText"
                  type="text"
                  id="description"
                  rows="3"
                  value={description}
                  placeholder="Enter description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          )}

          {product && type === "Music" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
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

              <label className="inputs__label" htmlFor="releaseDate">
                Release Date
              </label>
              <input
                className="inputs__input"
                type="text"
                id="releaseDate"
                placeholder="Enter release date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </>
          )}
          {product && type === "tab" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                <option value="digital download">Digital Download</option>
                <option value="book">Book</option>
              </select>
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
            </>
          )}
          {product && category === "book" && (
            <>
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
            </>
          )}
          {product && type === "Button" && (
            <>
              <label className="inputs__label" htmlFor="category">
                Category
              </label>
              <select
                className="inputs__input"
                id="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="buttons">Buttons</option>
              </select>

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
            </>
          )}
        </div>

        <button className="updateBtn" type="submit">
          Update
        </button>
      </form>
    </section>
  );
};

export default AdminProductEdit;
