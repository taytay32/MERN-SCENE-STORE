import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import SignIn from "./pages/SignIn/SignIn.js";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={PaymentMethod} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/order/:id" component={OrderDetails} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
