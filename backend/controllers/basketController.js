import Basket from '../models/basket.js';
import User from '../models/user.js';

export const getBasket = async(req, res) => {
    try {
        const { basket } = await User.findById(req.userId).populate('basket').exec();
        const newBasket = await Basket.findById(basket._id).populate('content.pizza').exec();
        res.json({newBasket});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка добавления пиццы"
        });
    }
}

export const plusPizza = async(req, res) => {
    try{
        const { basket } = await User.findById(req.userId).populate('basket').exec();
        let flag = false;
        for (let i in basket.content){
            if (basket.content[i].pizza.toString() === req.body.pizza){
                basket.content[i].count = +basket.content[i].count + (req.body.count || 1);
                flag = true;
                break;
            }
        }
        flag || basket.content.push({pizza: req.body.pizza, count: req.body.count || 1});
        await Basket.updateOne({
            _id: basket._id
        },
        basket);
        const newBasket = await Basket.findById(basket._id).populate('content.pizza').exec();

        res.json({newBasket});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Ошибка добавления пиццы"
        });
    }
}


export const minusPizza = async(req, res) => {
    try {
        const { basket } = await User.findById(req.userId).populate('basket').exec();
        for (let i in basket.content){
            if (basket.content[i].pizza.toString() === req.body.pizza){
                if (basket.content[i].count == 1) {
                    basket.content.splice(i, 1);
                }
                else{
                    basket.content[i].count--;
                }
                break;
            }
        }
        await Basket.updateOne({
            _id: basket._id
        },
        basket);

        const newBasket = await Basket.findById(basket._id).populate('content.pizza').exec();

        res.json({newBasket});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка удаления пиццы"
        });
    }
}


export const removePizza = async(req, res) => {
    try {
        const { basket } = await User.findById(req.userId).populate('basket').exec();
        for (let i in basket.content){
            if (basket.content[i].pizza.toString() === req.body.pizza){
                basket.content.splice(i, 1);
                break;
            }
        }
        await Basket.updateOne({
            _id: basket._id
        },
        basket);

        const newBasket = await Basket.findById(basket._id).populate('content.pizza').exec();

        res.json({newBasket});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка удаления пиццы"
        });
    }
}


export const clearBasket = async(req, res) => {
    try {
        const { basket } = await User.findById(req.userId).populate('basket').exec();
        basket.content = [];
        await Basket.updateOne({
            _id: basket._id
        },
        basket);
        const newBasket = await Basket.findById(basket._id).populate('content.pizza').exec();

        res.json({newBasket});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка очистки корзины"
        });
    }
}