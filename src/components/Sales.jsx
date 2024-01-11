import React, { useState } from "react";
import Item from "./utils/Item";
import Title from "./utils/Title";

const Sales = ({ ifExists, endpoint: { title, items } }) => {
  const [sortCriteria, setSortCriteria] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortItems = (criteria, order) => {
    return items.slice().sort((a, b) => {
      if (criteria === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (criteria === "name") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
  };

  const handleSortChange = (criteria) => {
    const newOrder =
      criteria === sortCriteria
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSortCriteria(criteria);
    setSortOrder(newOrder);
  };

  return (
    <>
      <div className="nike-container mt-20 mb-20">
        <Title title={title} />
        <div className="flex items-center space-x-4 mb-2 mt-2">
          <label className="text-gray-600">Sort by :</label>
          <button
            className={`p-2 border rounded-md ${
              sortCriteria === "price"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleSortChange("price")}
          >
            Price
          </button>
          <button
            className={`p-2 border rounded-md ${
              sortCriteria === "name"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleSortChange("name")}
          >
            Name
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={() => handleSortChange(sortCriteria)}
          >
            Toggle Order : {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

        <div
          className={`grid items-center justify-items-center gap-10 lg:gap-5 mt-7 ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {sortItems(sortCriteria, sortOrder).map((item, i) => (
            <Item {...item} key={i} ifExists={ifExists} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sales;
