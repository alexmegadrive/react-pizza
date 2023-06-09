import React, { useState, FC } from "react";
import { categories } from "../constants/categories";
import { useAppSelector, RootState } from "../redux/store";
import { useActions } from "../hooks/useActions";

// interface ICategoryProps {
//   selectedCategory: number;
//   setSelectedCategory: (selectedCategory: number) => void;
// }
// const Categories: FC<ICategoryProps> = () => {
const Categories: FC = () => {
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.categoryId
  );
  const { setCategory } = useActions();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setCategory(index)}
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
