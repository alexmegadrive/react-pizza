import { IPizzaBlock } from "@/components/PizzaList";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export enum FetchStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface IFetchPizzaParams {
  pageCurrent: number;
  categoryStr: string;
  searchStr: string;
  selectedSortType: string;
}

interface IProductsSliceState {
  items: IPizzaBlock[];
  status: FetchStatus;
  totalPages: number;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchPizzaStatus",
  async (params: IFetchPizzaParams) => {
    const { pageCurrent, categoryStr, searchStr, selectedSortType } = params;
    const baseUrl = "https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items?";
    const { data } = await axios.get(
      `${baseUrl}limit=8&page=${pageCurrent}&${categoryStr}${searchStr}&sortBy=${selectedSortType}&order=desc`
    );

    return data as IPizzaBlock[];
  }
);

const initialState: IProductsSliceState = {
  items: [],
  status: FetchStatus.LOADING,
  totalPages: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaBlock[]>) {
      state.items = action.payload;
    },
    setPagesTotal: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = FetchStatus.ERROR;
        state.items = [];
        state.totalPages = 0;
      });
  },
});
export const { actions: productsActions } = productsSlice;

export default productsSlice.reducer;
