import React, { useState } from "react";
import "./SearchBox.scss";
import magGlass from "../../assets/icons/search-24px.svg";

const SearchBox = (props) => {
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`search/name/${name}`);
  };

  return (
    <form className="searchForm" onSubmit={submitHandler}>
      <div className="searchWrapper">
        <input
          classname="searchInput"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="searchBtn">
          <img src={magGlass} alt="" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
