import React from "react";

const CartPage = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const size = props.location.search
    ? props.location.search.split("=")[3]
    : "no sizing selected";

  console.log(props.location.search);

  return (
    <div>
      <h1>Cart</h1>
      <p>
        Add to cart: ID: {productId}, QTY: {qty}, SIZE: {size}
      </p>
    </div>
  );
};

export default CartPage;
