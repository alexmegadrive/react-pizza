import { combineReducers, configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filter/filter.slice";
import cartReducer from "./slices/cart/cart.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

export const reducers = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
});
export const store = configureStore({
  reducer: reducers,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(getImages.middleware),
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }).concat(getImages.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type RootReducer = ReturnType<typeof reducers>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
