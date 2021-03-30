import React from "react";
import "./Boxes.scss";

const MessageBox = (props) => {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
};

export default MessageBox;
