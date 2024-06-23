import React from "react";
import { FaCog, FaSearch } from "react-icons/fa";
import "./heading-row.css";

const HeadingRow = ({ heading }) => {
  return (
    <div className="my-8 flex">
      <h1 className="text-3xl font-semibold flex-1 text-left">{heading}</h1>
      <div className="flex items-center">
        <div className="search-bar mr-8">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <FaCog className="settings-icon" />
      </div>
    </div>
  );
};

export default HeadingRow;
