import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPizzaBlock } from "@/components/PizzaList";

const FullPizza = () => {
  const [pizza, setPizza] = useState<IPizzaBlock>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza(id: number) {
      try {
        const { data } = await axios.get(
          `https://648051f0f061e6ec4d49103b.mockapi.io/pizza/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при загрузке данных");
        console.log("Ошибка при загрузке: ", error);
        navigate("/");
      }
    }
    fetchPizza(Number(id));
  }, []);

  if (!pizza) return <div className="container">Загрузка...</div>;

  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <span>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt cum porro
        molestiae, laudantium et aut voluptas ullam reprehenderit saepe velit.
        Nobis voluptatibus accusantium porro nesciunt necessitatibus ex
        blanditiis. Perferendis, fugit!
      </span>
      <h4>{pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
