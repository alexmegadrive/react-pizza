import React, { useContext, useEffect, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
import Pagination from "../components/Pagination";
import { sortValues } from "../constants/sortValues";
import { SearchContext } from "../App";
import { useActions } from "../hooks/useActions";
import { useAppSelector, RootState } from "../redux/store";

const Home = () => {
  const search = useContext(SearchContext);
  const [items, setItems] = useState<IPizzaBlock[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedSort, setSelectedSort] = useState("rating");
  // const [selectedCategory, setSelectedCategory] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const selectedSort = useAppSelector(
    (state: RootState) => state.filter.sort.name
  );
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.categoryId
  );

  const categoryStr = selectedCategory ? `category=${selectedCategory}` : "";
  const searchStr = search.searchValue ? `search=${search.searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    fetch(
      `https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?&${categoryStr}${searchStr}&sortBy=${selectedSort}&order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(Math.ceil(data.length / 8));
      });
    fetch(
      `https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?limit=8&page=${currentPage}&${categoryStr}${searchStr}&sortBy=${selectedSort}&order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        // setTotalPages(Math.ceil(data.length / 8));
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryStr, selectedSort, searchStr, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
        // selectedCategory={selectedCategory}
        // setSelectedCategory={(id) => setSelectedCategory(id)}
        />
        <Sort
        // selectedSort={selectedSort}
        // setSelectedSort={(id) => setSelectedSort(id)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <PizzaList
          list={items}
          isLoading={isLoading}
          // setIsloading={setIsLoading}
        />
      </div>
      <Pagination
        handleChangePage={(value: number) => setCurrentPage(value)}
        totalPages={totalPages}
        // selectedPage={currentPage}
      />
    </div>
  );
};

export default Home;
