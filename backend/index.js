import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import session from 'express-session';

import { registerValidation, pizzaValidation, basketValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import checkErrors from './utils/checkErrors.js';
import checkAdmin from './utils/checkAdmin.js';


import * as UserController from './controllers/userController.js';
import * as PizzaController from './controllers/pizzaController.js';
import * as IngredientController from './controllers/ingredientController.js';
import * as BasketController from './controllers/basketController.js';

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'media');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/media', express.static('media'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'you secret key' }));


mongoose.connect(`mongodb+srv://admin:wwww@cluster0.giwop.mongodb.net/pizza?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('DB connected');
    })
    .catch((e) => {
        console.error('DB connection error:', e);
    });


passport.use(new GoogleStrategy.Strategy({
    clientID: '555200474242-nv360bfnu2fd5kvkvd1pjsk4k2q5138k.apps.googleusercontent.com', 
    clientSecret: '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', 
    callbackURL: '/auth/google/callback' 
    }, async(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), UserController.googleAuthorize
);

     

app.get('/', (req, res) => {
    res.send('qwe');
});


app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, checkErrors, UserController.register);
app.get('/auth/profile', checkAuth, UserController.profile);

app.post('/media', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/media/${req.file.filename}`
    });
});

app.get('/pizzas', PizzaController.getAll);
app.get('/pizzas/:id', PizzaController.getOne);
app.delete('/pizzas/:id', checkAuth, checkAdmin, PizzaController.remove);
app.patch('/pizzas/:id', checkAuth, checkAdmin, upload.single('image'), pizzaValidation, checkErrors, PizzaController.update);
app.post('/pizzas', checkAuth, checkAdmin, upload.single('image'), pizzaValidation, checkErrors, PizzaController.create);

app.get('/ingredients', IngredientController.getAll);
app.get('/ingredients/:id', IngredientController.getOne);
app.delete('/ingredients/:id', checkAuth, checkAdmin, IngredientController.remove);
app.patch('/ingredients/:id', checkAuth, checkAdmin, IngredientController.update);
app.post('/ingredients', checkAuth, checkAdmin, IngredientController.create);


app.post('/basket/plus', checkAuth, basketValidation, checkErrors, BasketController.plusPizza);
app.post('/basket/minus', checkAuth, BasketController.minusPizza);
app.get('/basket', checkAuth, BasketController.getBasket);
app.post('/basket/remove', checkAuth, BasketController.removePizza);
app.post('/basket/clear', checkAuth, BasketController.clearBasket);


    
app.listen(8080, (err) => {
    console.log(err ? err : 'Server ok');
});