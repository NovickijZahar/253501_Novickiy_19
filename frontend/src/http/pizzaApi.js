import { $authHost, $host } from ".";


export const createPizza = async (pizza) => {
    const { data } = await $authHost.post('pizzas', pizza);
    return data;
}

export const removePizza = async (id) => {
    const { data } = await $authHost.delete(`pizzas/${id}`);
    return data;
}

export const updatePizza = async (id, pizza) => {
    const { data } = await $authHost.patch(`pizzas/${id}`, pizza);
    return data;
}

export const getAllPizzas = async () => {
    const { data } = await $host.get('pizzas');
    return data;
}


export const getOnePizza = async(id) => {
    const { data } = await $host.get(`pizzas/${id}`);
    return data;
}