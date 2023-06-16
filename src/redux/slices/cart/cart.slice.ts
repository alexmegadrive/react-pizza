import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  activeType: number;
  type: string;
  size: number;
  count: number;
}
interface ICartProps {
  items: ICartItem[];
  totalPrice: number;
}
const initialState: ICartProps = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<ICartItem, "count">>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) findItem.count++;
      else state.items.push({ ...action.payload, count: 1 });
      cartSlice.caseReducers.countTotalSum(state);
    },

    increaseItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) findItem.count++;
      cartSlice.caseReducers.countTotalSum(state);
    },
    decreaseItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem && findItem.count > 1) findItem.count--;
      
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
      cartSlice.caseReducers.countTotalSum(state);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    countTotalSum: (state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
    },
  },
});
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);
export const { actions: cartActions } = cartSlice;

export default cartSlice.reducer;
