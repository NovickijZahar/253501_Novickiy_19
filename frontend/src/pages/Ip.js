import { useEffect, useState } from "react";
import { getIp } from "../http/outsideApi";
import '../styles/Loader.css'


const Ip = () => {
    const [ip, setIp] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        getIp().then(data => {
            setIp(data.ip);
            setCountry(data.country)
            setRegion(data.region);
            setCity(data.city);
        });
    }, []);

    if (!ip){
        return <div className="container">
            <div className="loader"></div>
          </div>
    }

    return (<div style={{margin: '15px'}}>
        <p>Ip: {ip}</p>
        <p>Город: {city}</p>
        <p>Регион: {region}</p>
        <p>Страна: {country}</p>
    </div>)
}

export default Ip;