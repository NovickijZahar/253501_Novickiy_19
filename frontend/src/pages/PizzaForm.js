import React, { useState, useEffect } from 'react';
import { createPizza, updatePizza } from '../http/pizzaApi';
import { getAllIngredients } from '../http/ingredientApi';
import { useLocation, useParams } from 'react-router-dom';
import { getOnePizza } from "../http/pizzaApi";
import { CREATE_ROUTE } from '../utils/consts';
import '../styles/PizzaForm.css';

const PizzaForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const arrayIngredients = [];
    const [img, setImg] = useState('');
    const [image, setImage] = useState(null);

    const { id } = useParams();
    
    const location = useLocation();
    const isCreate = location.pathname === CREATE_ROUTE;

    useEffect(() => {
        getAllIngredients().then(data => {
            for (let i of data){
                arrayIngredients.push({data: i, selected: false});
            }

            if (!isCreate){
                getOnePizza(id).then(data => {
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    for (let i of data.ingredients) {
                        const existingItem = arrayIngredients.find(item => item.data._id === i._id);
                        if (existingItem) {
                            existingItem.selected = true;
                        }
                    }
                    setImg(data.imageUrl);
                });
            }
            setIngredients(arrayIngredients);
        });

      }, []);

    const handleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedIngredients(selectedValues);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        selectedIngredients.forEach(item => {
            formData.append('ingredients[]', item)
        });
        if (image) {
            formData.append('image', image);
        }
        console.log(formData);

        try {
            let data;
            if (isCreate){
                data = await createPizza(formData);
            }
            else{
                data = await updatePizza(id, formData);
            }

            if (data.success) {
                if (isCreate){
                    alert('Пицца успешно создана!');
                }
                else{
                    alert('Пицца успешно обновлена!');
                }
            } else {
                alert('Ошибка создания пиццы: ' + data.message);
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Цена:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ингредиенты:</label>
                    <select multiple={true} onChange={handleChange}>
                        {ingredients.map(item => (
                            <option key={item.data._id} value={item.data._id} selected={item.selected}>{item.data.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Изображение:</label>
                    {!isCreate && <img src={img} alt='Картинка'></img>}
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                {isCreate ?
                <button type="submit" className="button">Создать пиццу</button>
                :
                <button type="submit" className="button">Обновить пиццу</button>
                }
            </form>
        </div>
    )};

export default PizzaForm;