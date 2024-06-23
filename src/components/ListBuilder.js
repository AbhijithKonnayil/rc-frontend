import React from "react";

const ListBuilder = ({ dataList, noItemText, itemCard }) => {
  if (dataList.length == 0) {
    return <div className="">{noItemText}</div>;
  }
  return (
    <div>
      <ul className="">{dataList.map(itemCard)}</ul>
    </div>
  );
};

export default ListBuilder;
