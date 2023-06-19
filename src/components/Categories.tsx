import { memo, FC, useCallback } from "react";
import { categories } from "../constants/categories";
import { useAppSelector, RootState } from "../redux/store";
import { useActions } from "../hooks/useActions";

const Categories: FC = memo(() => {
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.categoryId
  );
  const { setCategory, setPageCurrent } = useActions();

  const handleChangeCategory = useCallback(
    (index: number) => {
      setPageCurrent(1);
      setCategory(index);
    },
    [setPageCurrent, setCategory]
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleChangeCategory(index)}
            className={selectedCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
