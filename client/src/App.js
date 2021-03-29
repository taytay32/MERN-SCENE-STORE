import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/product/:id" component={ProductPage} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
