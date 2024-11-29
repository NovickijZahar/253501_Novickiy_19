import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 4 }).withMessage('Длина пароля должна быть не менее 4 символов')
]

export const basketValidation = [
    body('count').isInt({min: 1, max: 10}).withMessage('Количество пицц должно быть от 1 до 10')
]

export const pizzaValidation = [
    body('name').isLength({ min:3 }).withMessage('Название пиццы должно состоять хотя бы из 3 символов'),
    body('price').isFloat({min: 1.00, max: 100.00}).withMessage('Цена должна быть в пределах от 1 до 100'),
]