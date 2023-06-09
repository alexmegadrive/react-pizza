import React, { useContext, useEffect, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
import Pagination from "../components/Pagination";
import { sortValues } from "../constants/sortValues";
import { SearchContext } from "../App";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import { useAppSelector, RootState } from "../redux/store";

const Home = () => {
  const baseUrl = "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";
  const [items, setItems] = useState<IPizzaBlock[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const selectedSort = useAppSelector(
    (state: RootState) => state.filter.sort.sortType
  );
  const searchValue = useAppSelector((state: RootState) => state.filter.value);
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.categoryId
  );

  const pageCurrent = useAppSelector(
    (state: RootState) => state.filter.pageCurrent
  );
  // const pagesTotal = useAppSelector(
  //   (state: RootState) => state.filter.pagesTotal
  // );
  const { setPageCurrent, setPagesTotal } = useActions();

  const categoryStr = selectedCategory ? `category=${selectedCategory}` : "";
  const searchStr = searchValue ? `search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    setPageCurrent(1);
    axios
      .get(
        `${baseUrl}${categoryStr}${searchStr}&sortBy=${selectedSort}&order=desc`
      )
      .then((res) => {
        setPagesTotal(Math.ceil(res.data.length / 8));
      });
    axios
      .get(
        `${baseUrl}limit=8&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSort}&order=desc`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryStr, selectedSort, searchStr, pageCurrent]);

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

      // selectedPage={currentPage}
      />
    </div>
  );
};

export default Home;
