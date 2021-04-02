import React from "react";
import "./Boxes.scss";

const LoadingBox = () => {
  return (
    <div className="loading">
      {/* <i className="fa fa-spinner fa-spin"></i> */}
      <p className="loading__p">...Loading</p>
    </div>
  );
};

export default LoadingBox;
