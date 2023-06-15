import { useCallback, useEffect, useRef, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import pizzas from "../data/pizzas.json";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import { useAppSelector, RootState } from "../redux/store";
import { sortValues } from "../constants/sortValues";
// import { fetchProducts, cons } from "@/redux/slices/products/products.slice";
// import { Dispatch } from "@reduxjs/toolkit";

const Home = () => {
  const navigate = useNavigate();

  const selectedSortType = useAppSelector(
    (state: RootState) => state.filter.sort.sortType
  );
  const { items, status } = useAppSelector(
    (state: RootState) => state.products
  );
  console.log("status from home :", status);
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
  const { setFilters, setMounted, fetchProducts } = useActions();

  const getPizzas = async () => {
    //// DEV
    // setItems(pizzas);
    // console.log("items :", items);

    const categoryStr = selectedCategory ? `category=${selectedCategory}` : "";
    const searchStr = searchValue ? `search=${searchValue}` : "";
    fetchProducts({ pageCurrent, categoryStr, searchStr, selectedSortType });

    // try {
    //   const { data: fetchedTotalItems } = await axios.get(
    //     `${baseUrl}&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
    //   );
    //   setPagesTotal(Math.ceil(fetchedTotalItems.length / 8));
    // } catch (e) {
    //   console.log("error: ", e);
    // }
  };

  // PARSE URL PARAMS
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortValues.find((el) => el.sortType === params.sortType);
      setFilters({ ...params, sort });
    }
    setMounted();
  }, []);

  // UPDATE URL PARAMS
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
      getPizzas();
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
      <PizzaList list={items} status={status} />

      <Pagination />
    </div>
  );
};

export default Home;
