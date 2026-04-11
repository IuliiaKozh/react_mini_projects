import './App.css';
import { useState, useEffect } from 'react';
import MyComponent  from './MyComponent';
import userEvent from '@testing-library/user-event';

function Countdown({startFrom}) {
  const [count, setCount] = useState(startFrom);
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const handleReset = () => {
    setCount(startFrom);
    setFinished(false);
  };

  return (
    <div style={{textAlign:"center", padding:"30px"}}>
      <h1>Обратный отсчет</h1>
      {finished ? (
        <div>
          <p style={{fontSize:"30px"}}>Время вышло!</p>
          <button onClick={handleReset} style={{padding: "8px 16px", marginTop:"12px"}}>Заново</button>
        </div>
      ):(
        <div>
          <p style={{fontSize: "72px", fontWeight: "bold", color: count <= 5 ? "red" : "black"}}>{count}</p>
          <p>Секунд осталось</p>
        </div>
        )}
    </div>
  );
}
export default Countdown;