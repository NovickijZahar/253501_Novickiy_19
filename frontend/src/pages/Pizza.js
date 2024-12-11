import { observer } from "mobx-react-lite";
import {  useEffect, useState } from "react";
import { getOnePizza } from "../http/pizzaApi";
import { useParams } from "react-router-dom";
import '../styles/Pizza.css';
import { plusPizza } from "../http/basketApi";

const Pizza = observer(() => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const [count, setCount] = useState(1); 


  useEffect(() => {
    getOnePizza(id).then(data => setPizza(data));
  }, []);

  const handleClick = (e) => {
    if (e.target.value > 10){
      setCount(10);
    }
    else if (e.target.value <= 0){
      setCount(1);
    }
    else {
      setCount(Math.round(e.target.value));
    }
  }

  if (!pizza){
    return (<div></div>)
  }

  
  return (
    <div className="pizza-container">
      <div className="pizza-name">{pizza.name}</div>
      <div className="pizza-image"><img src={pizza.imageUrl} alt="Картинка"></img></div>
      <div className="pizza-description">{pizza.description}</div>
      <div className="pizza-price">{pizza.price} BYN</div>
      <div className="ingredients">
        {pizza.ingredients.map(item => (
          <span key={item._id}>{item.name}</span>
        ))}
      </div>
      Количество: <input
        type="number"
        value={count}
        onChange={handleClick}
        min="1"
        max="10"
      />
      <button onClick={async() => 
      {
        try{

          await plusPizza(id); alert('Пицца добавлена в корзину'); 
        }
        catch(e){
          alert('Необходимо авторизоваться');
        }
      }}>Добавить в корзину</button>
    </div>
  );
});
  
export default Pizza;