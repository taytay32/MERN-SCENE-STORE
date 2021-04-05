import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LoadingBox from "../../components/boxes/LoadingBox";
import MessageBox from "../../components/boxes/MessageBox";
import Product from "../../components/product/Product";
import { listProducts } from "../../redux/actions/productActions";

const SearchResults = (props) => {
  const { name = "all" } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "" }));
  }, [dispatch, name]);
  return (
    <section className="searchResults">
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="cards">
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
