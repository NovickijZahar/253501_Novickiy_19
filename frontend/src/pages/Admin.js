import { useContext, useEffect } from "react";
import { Context } from "..";
import '../styles/Admin.css';
import { observer } from "mobx-react-lite";
import { getAllPizzas, removePizza } from "../http/pizzaApi";
import { useNavigate } from "react-router-dom";
import { CREATE_ROUTE, UPDATE_ROUTE } from "../utils/consts";

const Admin = observer(() => {
    const navigate = useNavigate();
    const { pizza } = useContext(Context);
    getAllPizzas().then(data => pizza.setPizzas(data))

    const handleRemovePizza = async (id) => {
      await removePizza(id);
    };

    return (
      <div>
        <button className="add" onClick={() => navigate(CREATE_ROUTE)}>Добавить пиццу</button>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Картинка</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Ингредиенты</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {pizza.pizzas.map((pizza) => (
              <tr key={pizza._id}>
                <td>{pizza.name}</td>
                <td style={{width: '150px'}}><img src={pizza.imageUrl} style={{width: '150px' }} alt='Картинка'></img></td>
                <td>{pizza.description}</td>
                <td>{pizza.price}</td>
                <td>{pizza.ingredients.map(item => (
                    <span key={item._id}>{item.name} </span>
                ))}</td>
                <td style={{width: '150px'}}>
                  <button className="update" onClick={() => navigate(UPDATE_ROUTE + '/' + pizza._id)}>Изменить</button>
                  <button className="remove" onClick={async() => await handleRemovePizza(pizza._id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  });
  
export default Admin;