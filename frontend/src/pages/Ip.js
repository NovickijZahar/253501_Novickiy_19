import React from "react";
import { getIp } from "../http/outsideApi";
import '../styles/Loader.css'


class Ip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ip: '',
            country: '',
            region: '',
            city: '',
            loading: true,
        };
    }

    componentDidMount() {
        getIp().then(data => {
            this.setState({
                ip: data.ip,
                country: data.country,
                region: data.region,
                city: data.city,
                loading: false,
            });
        });
    }

    render() {
        const { ip, country, region, city, loading } = this.state;

        if (loading) {
            return (
                <div className="container">
                    <div className="loader"></div>
                </div>
            );
        }

        return (
            <div style={{ margin: '15px' }}>
                <p>Ip: {ip}</p>
                <p>Город: {city}</p>
                <p>Регион: {region}</p>
                <p>Страна: {country}</p>
            </div>
        );
    }
}

export default Ip;