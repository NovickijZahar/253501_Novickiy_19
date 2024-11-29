import { $outsideHost } from ".";

export const checkGender = async(name) => {
    const { data } = await $outsideHost.get(`https://api.genderize.io/?name=${name}`);
    return { 
        gender: data.gender,
        probability: data.probability
    }
}

export const getIp = async() => {
    const response = await $outsideHost.get(`https://api.ipify.org/?format=json`);
    const { data } = await $outsideHost.get(`https://ipinfo.io/${response.data.ip}/geo`);
    return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country
    }
} 