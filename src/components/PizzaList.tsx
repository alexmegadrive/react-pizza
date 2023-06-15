import React, { FC, useContext } from "react";
import { PizzaBlock } from "./";
import PizzaSkeleton from "./PizzaBlock/skeleton";
import { useAppSelector, RootState } from "../redux/store";
import { IFetchStatus } from "@/redux/slices/products/products.slice";

export interface IPizzaBlock {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
interface IPizzaListProps {
  list: IPizzaBlock[] | never[];
  status: IFetchStatus;
}

const PizzaList: FC<IPizzaListProps> = ({ list, status }) => {
  console.log("status :", status);
  const searchValue = useAppSelector((state: RootState) => state.filter.value);

  const pizzas = list
    .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, _) => <PizzaBlock key={item.id} {...item} />);

  if (status === "error") {
    return (
      <div className="content__error">
        <h1>Возникла ошибка при загрузке 😕</h1>
        <span>Попробуйте повторить попытку позже</span>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div className="content__items">
        {...[...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)}
      </div>
    );
  }
  return <div className="content__items">{...pizzas}</div>;
};

export default PizzaList;
