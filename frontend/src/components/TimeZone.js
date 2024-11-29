import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const Basket = observer(() => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [timeZone, setTimeZone] = useState('');

    useEffect(() => {
        const updateDate = () => {
            setCurrentDate(new Date());
        };
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        const intervalId = setInterval(updateDate, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
      <div style={{'marginLeft': '15px'}}>
        <p>{currentDate.toLocaleString()} {timeZone}</p>
      </div>
    );
});
  
export default Basket;