import { useState, useEffect } from 'react';

// Задача 4. Счётчик с историей
// Улучши обычный счётчик: сохраняй не только текущее значение, но и историю последних 5
// изменений (массив чисел). Отображай историю под счётчиком. Всё сохраняй в localStorage.

function CountHistory() {
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem('counterValue');
        return saved !== null ? Number(saved ): 0;
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('counterHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('counterValue', String(count));
    }, [count]);
    useEffect(() => {
        localStorage.setItem('counterHistory', JSON.stringify(history))
    }, [history]);
    

    const changeCount = (delta) => {
        const newCount = count + delta; 
        setCount(newCount);

        setHistory([newCount, ...history].slice(0,5));
    };

    const reset = () => {
        setCount(0);
        setHistory([0, ...history].slice(0,5));
    };
    return (
        <div>
            <h3>Значение: {count}</h3>
            <button onClick={() => changeCount(1)}>+1</button>
            <button onClick={() => changeCount(-1)}>-1</button>
            <button onClick={reset}>сбросить</button>

            <p>история последних изменений: </p>
            <ul>
                {history.map((val, index) => (
                    <li key = {index}>
                        {index === 0 ? `${val} <- последнее` : val}
                    </li>
                ))}
            </ul>
        </div>
            )
        }

export default CountHistory;