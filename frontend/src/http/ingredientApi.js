import { $authHost, $host } from ".";


export const createIngredient = async (ingredient) => {
    const { data } = await $authHost.post('ingredients', ingredient);
    return data;
}

export const removeIngredient = async (id) => {
    const { data } = await $authHost.delete(`ingredients/${id}`);
    return data;
}

export const updateIngredient = async (id, ingredient) => {
    const { data } = await $authHost.patch(`ingredients/${id}`, ingredient);
    return data;
}

export const getAllIngredients = async () => {
    const { data } = await $host.get('ingredients');
    return data;
}


export const getOneIngredient = async(id) => {
    const { data } = await $host.get(`ingredients/${id}`);
    return data;
}