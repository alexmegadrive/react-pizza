import { IPizzaBlock } from "@/components/PizzaList";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IFetchPizzaParams {
  pageCurrent: number;
  categoryStr: string;
  searchStr: string;
  selectedSortType: string;
}

export type IFetchStatus = "loading" | "error" | "success";

interface IProductsSliceState {
  items: IPizzaBlock[];
  status: IFetchStatus;
  totalPages: number;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchPizzaStatus",
  async (params: IFetchPizzaParams) => {
    console.log("вход в thunk");
    const { pageCurrent, categoryStr, searchStr, selectedSortType } = params;
    const baseUrl = "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";
    const { data } = await axios.get(
      `${baseUrl}limit=8&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
    );

    return data;
  }
);

const initialState: IProductsSliceState = {
  items: [],
  status: "loading",
  totalPages: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaBlock[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 8);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});
// export const { setFilter, clearFilter } = filterSlice.actions;
export const { actions: productsActions } = productsSlice;

export default productsSlice.reducer;
