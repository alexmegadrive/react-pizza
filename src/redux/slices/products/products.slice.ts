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

// export type IFetchStatus = "loading" | "error" | "success";

interface IProductsSliceState {
  items: IPizzaBlock[];
  status: FetchStatus;
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
        console.log(" state.totalPages 555 :", state.totalPages);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCESS;
        state.items = action.payload;
        // state.totalPages = Math.ceil(action.payload.length / 8);
        console.log(" state.totalPages 66666666666666666 :", state.totalPages);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = FetchStatus.ERROR;
        state.items = [];
        state.totalPages = 0;
        console.log(" state.totalPages 777 :", state.totalPages);
      });
  },
});
// export const { setFilter, clearFilter } = filterSlice.actions;
export const { actions: productsActions } = productsSlice;

export default productsSlice.reducer;
