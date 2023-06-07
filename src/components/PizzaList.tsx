import React from "react";
import { PizzaBlock } from "./";
import PizzaSkeleton from "./PizzaBlock/skeleton";

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
  //   setIsLoading: (value: boolean) => void;
}
const PizzaList = ({ list, isLoading }: IPizzaListProps) => {
  return (
    <>
      {isLoading
        ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
        : list.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
    </>
  );
};

export default PizzaList;
