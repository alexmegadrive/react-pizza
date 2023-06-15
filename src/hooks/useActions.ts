import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
// import { imageSearchActions } from "../store/imageSearch/imageSearch.slice";
// import { formDataActions } from "../store/formData/formData.slice";
import { filterActions } from "../redux/slices/filter/filter.slice";
import { cartActions } from "@/redux/slices/cart/cart.slice";
import { productsActions } from "@/redux/slices/products/products.slice";
import { fetchProducts } from "@/redux/slices/products/products.slice";

const rootActions = {
  ...filterActions,
  ...cartActions,
  ...productsActions,
  fetchProducts,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
