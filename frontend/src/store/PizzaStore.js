import {makeAutoObservable} from 'mobx';

export default class PizzaStore{
    constructor(){
        this._pizzas = []
        makeAutoObservable(this);
    }

    setPizzas(pizzas){
        this._pizzas = pizzas;
    }

    get pizzas(){
        return this._pizzas;
    }
}