import { $authHost } from ".";

export const getBasket = async() => {
    const { data } = await $authHost.get('basket');
    return data;
}

export const plusPizza = async (pizzaId, count) => {
    count = count || 1;
    console.log(count);
    const { data } = await $authHost.post('basket/plus', {pizza: pizzaId, count: count});
    return data;
}

export const minusPizza = async (pizzaId) => {
    const { data } = await $authHost.post('basket/minus', {pizza: pizzaId});
    return data;
}

export const removePizza = async (pizzaId) => {
    const { data } = await $authHost.post('basket/remove', {pizza: pizzaId});
    return data;
}

export const clearBasket = async () => {
    const { data } = await $authHost.post('basket/clear');
    return data;
}