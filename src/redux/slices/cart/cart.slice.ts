import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import employeesDB from "../../data/employees";
// import { IEmployeCard } from "../../components/Employees/EmployeesList/EmployeesList";

interface ICartItem {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
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
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.filter((el) => el.id !== action.payload);
    },
    clearItems: (state, action) => {
      state.items = [];
    },
  },
});
// export const { setFilter, clearFilter } = filterSlice.actions;
export const { actions: cartActions } = cartSlice;

export default cartSlice.reducer;
