import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../redux/actions/productActions";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import "./AdminProductList.scss";
import "../OrderHistory/OrderHistory.scss";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../../redux/constants/productConstants";

const AdminProductList = (props) => {
  //PULL FROM STORE
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  //CREATE PRODUCT PUSHES TO EDIT PAGE, OTHERWISE, POPULATE PRODUCT LIST
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({
        type: PRODUCT_DELETE_RESET,
      });
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, props.history, successCreate, successDelete]);

  //DELETE PRODUCT
  const deleteHandler = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  //CREATE PRODUCT
  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <section className="orderHistory adminProdList">
      <h1 className="orderHistory__title">Products</h1>
      <div className="createBtnWrap">
        <button
          type="button"
          className="orderHistWrap__btn"
          onClick={createHandler}
        >
          Create Product
        </button>
      </div>

      <div className="orderHistWrap">
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products &&
              products.map((product) => (
                <div key={product._id} className="orderHistCard productCard">
                  <img
                    className="productCard__img"
                    src={product.image}
                    alt={product.name}
                  />

                  <h3 className="orderHistCard__subtitle">NAME</h3>
                  <p className="orderHistCard__p">{product.name}</p>
                  <h3 className="orderHistCard__subtitle">PRICE</h3>
                  <p className="orderHistCard__p">${product.price}</p>
                  <h3 className="orderHistCard__subtitle">TYPE</h3>
                  <p className="orderHistCard__p">{product.type}</p>
                  <h3 className="orderHistCard__subtitle">CATEGORY</h3>
                  <p className="orderHistCard__p">{product.category}</p>

                  <button
                    type="button"
                    className="detailsBtn editBtn"
                    onClick={() => {
                      props.history.push(`/product/${product._id}/edit`);
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    className="deleteBtn"
                    onClick={() => deleteHandler(product)}
                  >
                    DELETE
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default AdminProductList;
