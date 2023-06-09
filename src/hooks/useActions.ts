import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
// import { imageSearchActions } from "../store/imageSearch/imageSearch.slice";
// import { formDataActions } from "../store/formData/formData.slice";
import { filterActions } from "../redux/slices/filter/filter.slice";

const rootActions = {
  ...filterActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
