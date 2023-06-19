import { FC } from "react";
import { PizzaBlock } from "./";
import PizzaSkeleton from "./PizzaBlock/skeleton";
import { useAppSelector, RootState } from "../redux/store";
import { FetchStatus } from "@/redux/slices/products/products.slice";

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
  status: FetchStatus;
}

const PizzaList: FC<IPizzaListProps> = ({ list, status }) => {
  const searchValue = useAppSelector((state: RootState) => state.filter.value);

  const pizzas = list
    .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, _) => <PizzaBlock {...item} />);

  if (status === FetchStatus.ERROR) {
    return (
      <div className="content__error">
        <h1>Возникла ошибка при загрузке 😕</h1>
        <span>Попробуйте повторить попытку позже</span>
      </div>
    );
  }
  if (status === FetchStatus.LOADING) {
    return (
      <div className="content__items">
        {...[...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)}
      </div>
    );
  }
  if (status === FetchStatus.SUCCESS && pizzas.length > 0) {
    return <div className="content__items">{...pizzas}</div>;
  } else return <h2>Ничего не найдено, попробуйте изменить поиск</h2>;
};

export default PizzaList;
