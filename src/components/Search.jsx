import React from "react";
import "./search.css";

const Search = ({ children }) => {
  return (
    <>
      <div className="form-group has-search ">
        <span className=" form-control-feedback">🔍</span>
        {children}
      </div>
    </>
  );
};

export default Search;
