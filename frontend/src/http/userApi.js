import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../utils/consts";


export const registration = async (email, password) => {
    const { data } = await $host.post('auth/register', {
        email, password
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const googleAuthentifiaction = async() => {
    window.location.href = `${API_URL}auth/google`;
}


export const login = async (email, password) => {
    const { data } = await $host.post('auth/login', {
        email, password
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}


export const check = async() => {
    try{
        const { data } = await $authHost.get('auth/profile');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    }
    catch(err){
        return null;
    }
}