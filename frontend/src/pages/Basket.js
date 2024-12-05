import { useState } from 'react';
import { clearBasket, getBasket, minusPizza, plusPizza, removePizza } from '../http/basketApi';

function Basket() {
    const [basket, setBasket] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    
    getBasket().then((data)=>{
      setBasket(data.newBasket.content);
      let sum = 0;
      basket.map((item) => {
        sum += item.pizza.price * item.count;
      });
      setTotalSum(sum.toFixed(2));
    });
    

    return (
      <div>
        <button style={{width: '200px', backgroundColor: 'red'}} onClick={async() => clearBasket()}>Очистить корзину</button>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Картинка</th>
              <th>Цена одной пиццы</th>
              <th>Цена</th>
              <th style={{width: '50px'}}>Уменьшить</th>
              <th>Количество</th>
              <th style={{width: '50px'}}>Увеличить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
          {basket.map((pizza) => (
              <tr key={pizza._id}>
                <td>{pizza.pizza.name}</td>
                <td><img src={pizza.pizza.imageUrl} alt='Картинка'></img></td>
                <td>{pizza.pizza.price}BYN</td>
                <td>{(pizza.pizza.price*pizza.count).toFixed(2)}BYN</td>
                <td><button onClick={async() => await minusPizza(pizza.pizza._id)}>-</button></td>
                <td>{pizza.count}</td>
                <td><button onClick={async() => await plusPizza(pizza.pizza._id)}>+</button></td>
                <td><button onClick={async() => await removePizza(pizza.pizza._id)}>Удалить</button></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>Общая сумма</td>
              <td>{totalSum}BYN</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
      </table>
    </div>
    );
  }
  
export default Basket;