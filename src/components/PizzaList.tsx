import React, { useContext } from "react";
import { PizzaBlock } from "./";
import PizzaSkeleton from "./PizzaBlock/skeleton";
import { useAppSelector, RootState } from "../redux/store";
// import { SearchContext } from "../App";

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
  isLoading: boolean;
  // searchValue: string;
  //   setIsLoading: (value: boolean) => void;
}
const PizzaList = ({ list, isLoading }: IPizzaListProps) => {
  // const search = useContext(SearchContext);
  const searchValue = useAppSelector((state: RootState) => state.filter.value);

  const pizzas = list
    .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, _) => <PizzaBlock key={item.id} {...item} />);
  return (
    <>
      {isLoading
        ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
        : pizzas}
    </>
  );
};

export default PizzaList;
