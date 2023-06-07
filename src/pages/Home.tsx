import React, { useEffect, useState } from "react";
import { Categories, Sort } from "../components";
import PizzaList, { IPizzaBlock } from "../components/PizzaList";
// import "../scss/app.scss";

const Home = () => {
  const [items, setItems] = useState<IPizzaBlock[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setItems(pizzas);
    fetch("https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
        <h2 className="content__title">Все пиццы</h2>
      </div>
      <div className="content__items">
        <PizzaList
          list={items}
          isLoading={isLoading}
          // setIsloading={setIsLoading}
        />
      </div>
    </>
  );
};

export default Home;
