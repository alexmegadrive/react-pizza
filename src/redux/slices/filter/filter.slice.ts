import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import employeesDB from "../../data/employees";
// import { IEmployeCard } from "../../components/Employees/EmployeesList/EmployeesList";

interface IFilterInitialState {
  value: string;
  categoryId: number;
  sort: { name: string; sortType: string; popup: boolean };
  pageCurrent: number;
  pagesTotal: number;
}
const initialState: IFilterInitialState = {
  value: "",
  categoryId: 0,
  pageCurrent: 1,
  pagesTotal: 1,
  sort: { name: "популярности", sortType: "rating", popup: false },
};
// interface IFilterSLiceState < string>
// const initialState = "";

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      return (state = { ...state, value: action.payload });
    },
    setCategory: (state, action: PayloadAction<number>) => {
      return (state = { ...state, categoryId: action.payload });
    },
    setPageCurrent: (state, action: PayloadAction<number>) => {
      return (state = { ...state, pageCurrent: action.payload });
    },
    setPagesTotal: (state, action: PayloadAction<number>) => {
      return (state = { ...state, pagesTotal: action.payload });
    },
    setSort: (
      state,
      action: PayloadAction<{ name: string; sortType: string; popup: boolean }>
    ) => {
      return (state = { ...state, sort: action.payload });
    },
    toggleSortPopup: (
      state
      //   action: PayloadAction<>
    ) => {
      return (state = {
        ...state,
        sort: { ...state.sort, popup: !state.sort.popup },
      });
    },
    clearFilter: (state) => {
      return (state = { ...state, value: "" });
    },
  },
});
// export const { setFilter, clearFilter } = filterSlice.actions;
export const { actions: filterActions } = filterSlice;

export default filterSlice.reducer;
