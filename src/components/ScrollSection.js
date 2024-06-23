import { default as React, useState } from "react";
import TextField from "./textfield";

export const ScrollSection = ({
  title,
  list,
  displayTextFun,
  isCheckbox,
  selectedItem,
  handleCheckboxChange,
}) => {
  const [searchKeyword, onSearchChange] = useState("");
  const filteredList = list.filter((e) => {
    return displayTextFun(e)
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
  });
  return (
    <div className="basis-2/5 p-2 m-4 border-0 rounded shadow-sm">
      <div className="block ">
        {list.length === 0 ? `No ${title}` : `${title}`}
      </div>
      <div className="flex my-4">
        <TextField
          value={searchKeyword}
          placeholder={`Search ${title}`}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          className="flex-1"
        />
        <button
          className="p-2 ml-2 bg-gray-900 text-white rounded"
          onClick={() => onSearchChange("")}
        >
          Clear
        </button>
      </div>

      <ul className="">
        {filteredList.length == 0 ? (
          <li className="text-center text-gray-500">No {title}</li>
        ) : (
          <></>
        )}

        {filteredList.reverse().map((c, index) => {
          return (
            <li
              key={index}
              className={`bg-orange-100 text-left my-2 p-5 rounded-md`}
            >
              {isCheckbox && (
                <input
                  type="checkbox"
                  checked={selectedItem[c.id]}
                  className="mr-4 transform scale-150 accent-orange-600"
                  onChange={() => handleCheckboxChange(c.id)}
                />
              )}
              {displayTextFun(c)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollSection;
