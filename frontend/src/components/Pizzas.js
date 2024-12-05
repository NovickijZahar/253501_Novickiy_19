import { useNavigate } from "react-router-dom";
import { plusPizza } from "../http/basketApi";
import { PIZZA_ROUTE } from "../utils/consts";

const Pizzas = (props) => {
    const navigate = useNavigate();

    return (
        <div className="cards-container">
        {props.pizzas.map((pizza) => (
          <div key={pizza._id} className="product-card">
            <div>
              <img
                src={pizza.imageUrl}
                alt='Картинка'
                onClick={() => navigate(PIZZA_ROUTE + '/' + pizza._id)}
              />
            </div>
            <div>{pizza.name}</div>
            <div>{pizza.price} BYN</div>
            <div>
              <button onClick={async () => { await plusPizza(pizza._id); alert('Пицца добавлена в корзину'); }}>
                Добавить в корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    )
}

export default Pizzas;