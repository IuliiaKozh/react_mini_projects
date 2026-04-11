import { useState, useEffect } from 'react';

// Задача 8. Таймер Помодоро
// Создай таймер: 25 минут работы, потом 5 минут отдыха. Кнопки «Старт», «Стоп», «Сброс».
// Сохраняй в localStorage количество завершённых помодоро (полных 25-минутных сессий).
// При перезагрузке — показывай сохранённый счётчик

function PomodoroTimer() {
    const [seconds, setSeconds] = useState(25*60); //25min
    const [isRunning, setIsRunning] = useState(false);
    const [sessionType, setSessionType] = useState('work'); //work/break
    const [completedPomodoro, setCompletedPomodoro] = useState(() => {
    const saved = localStorage.getItem('pomodoroCount');
        return saved !== null ? Number(saved) : 0;
    });
    

    useEffect(() => {
        localStorage.setItem('pomodoroCount', String(completedPomodoro));
    }, [completedPomodoro]);


    useEffect(() => {
        if (!isRunning) return;
        //setInterval вызывал функцию каждые 1000 мс 
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
            }, 1000)
            return () => clearInterval(interval);
        }, [isRunning]);

    useEffect(() => {
        if (sessionType === 'work') {
            setCompletedPomodoro(prev => prev + 1);
        } else if (sessionType === 'pause') {
            setCompletedPomodoro(prev => prev - 1);
        } else if (sessionType === 'completed') {
            setCompletedPomodoro(prev => prev + 1);
        }
    }, [sessionType]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };
    
    const reset = () => {
        setIsRunning(false);
        setSessionType('work');
        setSeconds(25 * 60);
    }

    const formatTime = () => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    
    return (
    <div
        className="container"
        style={{
            display: "flex",
            flexDirection: "column",  
            justifyContent: "center",  
            alignItems: "center",      
            height: "100vh",           
            gap: "20px"               
        }}
    >
        <h1>Pomodoro Timer</h1>
        <h2 style={{
            color:"black"
        }}>
            {formatTime()}
        </h2>

        <div className="buttons" style={{ display: "flex", gap: "10px" }}>
            <button
                onClick={handleStart}
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "rgba(145, 232, 165, 0.8)",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Старт
            </button>

            <button
                onClick={handlePause}
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "rgba(138, 143, 219, 0.8)",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Пауза
            </button>

            <button
                onClick={reset}
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "rgba(237, 111, 111, 0.8)",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Сброс
            </button>
        </div>
    </div>
);


}
export default PomodoroTimer;
// основная логика таймера он запускается каждую секунду isRunning === true
//очищать интервал и перезапускать эффект если изменился тип сессии
//функция сброса таймера
// форматирование секунд в MM:SS
// Форматируем секунды в MM:SS
//   const minutes = Math.floor(seconds / 60);     // целая часть — минуты
//   const secs = seconds % 60;                    // остаток — секунды
  // padStart(2, '0') добавляет ноль спереди если число однозначное: '5' → '05'
//   const timerDisplay = ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')};