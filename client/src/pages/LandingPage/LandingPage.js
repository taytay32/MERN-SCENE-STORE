import React from "react";
import "./LandingPage.scss";
import merch from "../../assets/images/merch/hoodie-pam.jpeg";

const LandingPage = () => {
  return (
    <section className="landingPage">
      <div className="cards">
        <div className="card">
          <div className="img">
            <img src={merch} alt="" className="img__img" />
          </div>
          <div className="info">
            <h2 className="info__title">Crow Hoodie</h2>
            <p className="info__price">$20</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
