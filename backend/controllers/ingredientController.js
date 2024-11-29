import Ingredient from '../models/ingredient.js';

export const create = async (req, res) => {
    try {
        // const user = await User.findById(req.userId);
        // if (!user || user.role != 'admin'){
        //     return res.status(403).json({
        //         message: 'Доступ запрещен'
        //     });
        // }

        const doc = new Ingredient({
            name: req.body.name
        });

        const ingredient = await doc.save();

        res.json({
            success: true,
            ...ingredient._doc
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка создания игредиента"
        });
    }
}


export const getAll = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка получения ингредиентов"
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        res.json(ingredient)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка получения ингредиентов"
        });
    }
}


export const remove = async (req, res) => {
    try {
        const result = await Ingredient.deleteOne({
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
                message: "Такого ингредиента не существует"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка удаления ингредиента"
        });
    }
}


export const update = async (req, res) => {
    try {
        // const user = await User.findById(req.userId);
        // if (!user || user.role != 'admin'){
        //     return res.status(403).json({
        //         message: 'Доступ запрещен'
        //     });
        // }
        const updatedData = {
            name: req.body.name
        }

        await Ingredient.updateOne({
            _id: req.params.id
        },
        updatedData);
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка изменения ингредиента"
        });
    }
}