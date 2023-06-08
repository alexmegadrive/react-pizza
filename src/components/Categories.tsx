import React, { useState, FC } from "react";
import { categories } from "../constants/categories";

interface ICategoryProps {
  selectedCategory: number;
  setSelectedCategory: (selectedCategory: number) => void;
}
const Categories: FC<ICategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(index)}
            className={selectedCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
