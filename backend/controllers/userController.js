import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
import Basket from '../models/basket.js';


export const googleAuthorize = async(req, res) => {
    try {
        const email = req.user.emails[0].value;
        let user = await User.findOne({ email: email });
        if (!user){
            const password = req.user.id;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const basket = new Basket();
            await basket.save();

            const doc = new User({
                email: email,
                passwordHash: passwordHash,
                role: 'defaultUser',
                basket: basket
            });
            user = await doc.save();
        }
        const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        }, 
        'secretkey',
        {
            expiresIn: '10d',
        });
    

        res.redirect(`http://localhost:3000/google/${token}`);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка аутентификации"
        });
    }
}


export const register = async (req, res) => {
    try{
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser){
            return res.status(404).json({
                message: 'Пользователь с такой почтой уже существует'
            });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const basket = new Basket();
        await basket.save();
        
        const doc = new User({
            email: req.body.email,
            passwordHash: passwordHash,
            role: 'defaultUser',
            basket: basket
        });
        const user = await doc.save();
        const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        }, 
        'secretkey',
        {
            expiresIn: '24h',
        });
        
        res.json({
            ...user._doc, 
            token
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Ошибка регистрации"
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user){
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword){
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }

        const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        }, 
        'secretkey',
        {
            expiresIn: '10d',
        });

        res.json({
            ...user._doc, 
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка авторизации"
        });
    }
};

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: "Пользователь не найден",
                token: req.userId
            });
        }
        res.json({
            ...user._doc,
            token: req.token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка доступа"
        });
    }
};