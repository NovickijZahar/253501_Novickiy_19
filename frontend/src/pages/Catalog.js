import { useContext, useState, useEffect } from "react";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import '../styles/Pizzas.css';
import { PIZZA_ROUTE } from "../utils/consts";
import { getAllPizzas } from "../http/pizzaApi";
import { observer } from "mobx-react-lite";
import { plusPizza } from "../http/basketApi";

const Catalog = observer(() => {
  const navigate = useNavigate();
  const { pizza } = useContext(Context);
  const PRODUCTS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState('price'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 

  useEffect(() => {
    getAllPizzas().then(data => pizza.setPizzas(data));
  }, []);

  const filteredPizzas = pizza.pizzas.filter(pizza => {
    const price = pizza.price;
    const min = parseFloat(minPrice) || 0; 
    const max = parseFloat(maxPrice) || Infinity; 
    return price >= min && price <= max;
  });

  const sortedPizzas = filteredPizzas.sort((a, b) => {
    let compareValue;
    if (sortType === 'price') {
      compareValue = a.price - b.price; 
    } else {
      compareValue = a.ingredients.length - b.ingredients.length; 
    }
    return sortOrder === 'asc' ? compareValue : -compareValue; 
  });

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredPizzas.length]);

  const totalPages = Math.max(1, Math.ceil(filteredPizzas.length / PRODUCTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentPizzas = sortedPizzas.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="sort-controls">
        <label>Сортировать по:</label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="price">Цене</option>
          <option value="ingredients">Количество ингредиентов</option>
        </select>
        <label>Порядок:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
      
      <div className="sort-controls">
        <label>Минимальная цена:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="0"
        />
        <label>Максимальная цена:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="∞"
        />
      </div>

      <div className="cards-container">
        {currentPizzas.map((pizza) => (
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
      
      <div className="pagination">
        <button className="pagButton" onClick={handlePrevPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        <div className="page">{`${currentPage}/${totalPages}`}</div>
        <button className="pagButton" onClick={handleNextPage} disabled={currentPage === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
});

export default Catalog;