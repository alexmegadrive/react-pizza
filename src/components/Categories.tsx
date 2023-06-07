import React, { useState } from "react";
import { categories } from "../constants/categories";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  //   const handleCategoryChange = (category: number) => {
  //     setActiveCategory(category);
  //   };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveCategory(index)}
            className={activeCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
