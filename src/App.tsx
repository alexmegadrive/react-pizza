import { useState } from "react";
import viteLogo from "/vite.svg";
import { Header, Sort, Categories, PizzaBlock } from "./components";
import "./scss/app.scss";
import pizzas from "./data/pizzas.json";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((pizza) => (
                <PizzaBlock
                  key={pizza.id}
                  title={pizza.title}
                  price={pizza.price}
                  imageUrl={pizza.imageUrl}
                  category={pizza.category}
                  types={pizza.types}
                  sizes={pizza.sizes}
                  rating={pizza.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <h1>Test</h1> */}
    </>
  );
}

export default App;
