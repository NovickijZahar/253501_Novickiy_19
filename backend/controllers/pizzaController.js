import Pizza from '../models/pizza.js';
import User from '../models/user.js';

export const create = async (req, res) => {
    try {


        const imageUrl = req.file ? req.file.filename : 'defaultPizza.png';

        const doc = new Pizza({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            ingredients: req.body.ingredients,
            imageUrl: `http://localhost:8080/media/${imageUrl}`
        });

        const pizza = await doc.save();

        res.json({
            success: true,
            ...pizza._doc
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка создания пиццы"
        });
    }
}


export const getAll = async (req, res) => {
    try {
        const pizzas = await Pizza.find().populate('ingredients').exec();
        res.json(pizzas)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка получения пицц"
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id).populate('ingredients').exec();
        res.json(pizza)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка получения пиццы"
        });
    }
}


export const remove = async (req, res) => {
    try {
        const result = await Pizza.deleteOne({
            _id: req.params.id
        });
        if (result.deletedCount > 0 ){
            res.json({
                success: true
            });
        }
        else {
            res.json({
                success: false,
                message: "Такой пиццы не существует"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка удаления пиццы"
        });
    }
}


export const update = async (req, res) => {
    try {
        const imageUrl = req.file ? req.file.filename : null;
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            ingredients: req.body.ingredients,
        }
        if (imageUrl){
            updatedData.imageUrl = `http://localhost:8080/media/${imageUrl}`;
        }

        await Pizza.updateOne({
            _id: req.params.id
        },
        updatedData);
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка изменения пиццы"
        });
    }
}