import { useCallback, useEffect, useRef, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { useActions } from "../hooks/useActions";
import axios from "axios";
import { useAppSelector, RootState } from "../redux/store";
import { sortValues } from "../constants/sortValues";

const Home = () => {
  const navigate = useNavigate();
  const baseUrl = "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";
  const [items, setItems] = useState<IPizzaBlock[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedSortType = useAppSelector(
    (state: RootState) => state.filter.sort.sortType
  );
  const searchValue = useAppSelector((state: RootState) => state.filter.value);
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.categoryId
  );
  const isMounted = useAppSelector(
    (state: RootState) => state.filter.isMounted
  );
  const pageCurrent = useAppSelector(
    (state: RootState) => state.filter.pageCurrent
  );
  const { setPagesTotal, setFilters, setMounted } = useActions();
  const categoryStr = selectedCategory ? `category=${selectedCategory}` : "";
  const searchStr = searchValue ? `search=${searchValue}` : "";

  const fetchPizzas = async () => {
    axios
      .get(
        `${baseUrl}${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
      )
      .then((res) => {
        setPagesTotal(Math.ceil(res.data.length / 8));
      });
    axios
      .get(
        `${baseUrl}limit=8&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
      )
      .then((res) => {
        setItems(res.data);
        console.log("res.data :", res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // // PARSE URL PARAMS
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortValues.find((el) => el.sortType === params.sortType);
      setFilters({ ...params, sort });
    }
    setMounted();
  }, []);

  // // // // UPDATE URL PARAMS
  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        sortType: selectedSortType,
        categoryId: selectedCategory,
        pageCurrent: pageCurrent,
      });
      navigate(`?${queryString}`);
    }
  }, [selectedCategory, selectedSortType, pageCurrent]);

  // // FETCH PIZZAS
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isMounted) {
      fetchPizzas();
    }
  }, [isMounted, selectedCategory, selectedSortType, pageCurrent]);

  console.log("render");
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
