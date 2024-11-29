import { useState } from "react";
import { checkGender } from "../http/outsideApi";

const GenderCheck = () =>{
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [probability, setProbability] = useState(0);

    const handeClick = async () => {
        checkGender(name).then(data => {
            setGender(data.gender);
            setProbability(data.probability);
        });
    }

    return (<div style={{margin: '30px'}}>
        <div>
            <input style={{width: '200px'}} type='text' value={name} onChange={(e) => setName(e.target.value)} required></input>
        </div>
        <div>
            <button style={{width: '200px'}} onClick={() => handeClick()}>Узнать пол</button>
        </div>
        <p>Пол: {gender}</p>
        <p>Вероятность: {probability*100}%</p>
    </div>)
}

export default GenderCheck;