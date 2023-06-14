import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
// import employeesDB from "../../data/employees";
// import { IEmployeCard } from "../../components/Employees/EmployeesList/EmployeesList";

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
// interface IFilterSLiceState < string>
// const initialState = "";

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
      else cartSlice.caseReducers.removeItem(state, action);
      cartSlice.caseReducers.countTotalSum(state);
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
// export const { setFilter, clearFilter } = filterSlice.actions;
export const { actions: cartActions } = cartSlice;

export default cartSlice.reducer;
