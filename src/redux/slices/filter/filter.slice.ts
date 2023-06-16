import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IFilterProps {
  value: string;
  categoryId: number;
  sort: { name: string; sortType: string };
  pageCurrent: number;
  pagesTotal: number;
  isMounted: boolean;
  popup: boolean;
}
const initialState: IFilterProps = {
  value: "",
  categoryId: 0,
  pageCurrent: 1,
  pagesTotal: 1,
  sort: { name: "популярности", sortType: "rating" },
  popup: false,
  isMounted: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return (state = { ...state, value: action.payload, pageCurrent: 1 });
    },
    setCategory: (state, action: PayloadAction<number>) => {
      return (state = { ...state, categoryId: action.payload, pageCurrent: 1 });
    },
    setPageCurrent: (state, action: PayloadAction<number>) => {
      return (state = { ...state, pageCurrent: action.payload });
    },

    setFilters: (state, action: PayloadAction<any>) => {
      return (state = {
        ...state,
        sort: action.payload.sort,
        pageCurrent: Number(action.payload.pageCurrent),
        categoryId: Number(action.payload.categoryId),
      });
    },
    setSort: (
      state,
      action: PayloadAction<{ name: string; sortType: string }>
    ) => {
      return (state = { ...state, sort: action.payload });
    },
    toggleSortPopup: (state) => {
      return (state = {
        ...state,
        popup: !state.popup,
      });
    },

    closePopup: (state) => {
      return (state = {
        ...state,
        popup: false,
      });
    },
    openPopup: (state) => {
      return (state = {
        ...state,
        popup: true,
      });
    },
    clearFilter: (state) => {
      return (state = { ...state, value: "" });
    },
    setMounted: (state) => {
      return (state = { ...state, isMounted: true });
    },
  },
});
export const { actions: filterActions } = filterSlice;

export default filterSlice.reducer;
