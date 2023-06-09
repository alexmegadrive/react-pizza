import { useEffect, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
import Pagination from "../components/Pagination";

import { useActions } from "../hooks/useActions";
import axios from "axios";
import { useAppSelector, RootState } from "../redux/store";

const Home = () => {
  const baseUrl = "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";
  const [items, setItems] = useState<IPizzaBlock[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <PizzaList list={items} isLoading={isLoading} />
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
