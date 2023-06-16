import { useEffect } from "react";
import { Categories, Sort, PizzaList, Pagination } from "../components";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import qs from "qs";
import axios from "axios";
import { useAppSelector, RootState } from "../redux/store";
import { sortValues } from "../constants/sortValues";
import { FetchStatus } from "@/redux/slices/products/products.slice";

const Home = () => {
  const navigate = useNavigate();

  const selectedSortType = useAppSelector(
    (state: RootState) => state.filter.sort.sortType
  );
  const { items, status, totalPages } = useAppSelector(
    (state: RootState) => state.products
  );

  const {
    categoryId: selectedCategory,
    isMounted,
    pageCurrent,
    value: searchValue,
    popup,
    sort,
  } = useAppSelector((state: RootState) => state.filter);

  const { setFilters, setMounted, fetchProducts, setPagesTotal } = useActions();

  const getPizzas = async () => {
    const categoryStr = selectedCategory ? `category=${selectedCategory}` : "";
    const searchStr = searchValue ? `search=${searchValue}` : "";
    fetchProducts({ pageCurrent, categoryStr, searchStr, selectedSortType });

    try {
      const baseUrl =
        "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";

      const { data: fetchedTotalItems } = await axios.get(
        `${baseUrl}&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
      );

      await setPagesTotal(Math.ceil(fetchedTotalItems.length / 8));
    } catch (e) {
      console.log("error: ", e);
    }
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
  }, [isMounted, selectedCategory, selectedSortType, pageCurrent, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort selectedSort={sort.sortType} popup={popup} />
      </div>
      {status !== FetchStatus.ERROR && (
        <h2 className="content__title">Все пиццы</h2>
      )}
      <PizzaList list={items} status={status} />

      {totalPages > 0 && <Pagination />}
    </div>
  );
};

export default Home;
