import { useState, useEffect } from 'react';

// Задача 10. Мини-проект: Трекер привычек
// Создай приложение «Трекер привычек» из нескольких компонентов:
// • HabitForm — добавление новой привычки (название + иконка-эмодзи)
// • HabitCard — карточка привычки с кнопкой «Выполнено сегодня» (визуально отмечает
// текущий день)
// • HabitList — список всех привычек
// • Summary — сколько привычек выполнено сегодня из всех
// Привычки и отметки о выполнении хранятся в localStorage. Данные об отметках
// сбрасываются каждый новый день (сравнивай дату последнего сохранения с сегодняшней).


function HabitTracker() {
    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem('habits');
        return storedHabits ? JSON.parse(storedHabits) : [];
    });

    const [habitInput, setHabitInput] = useState('');
    const todayDay = new Date().getDate();

    const todayDayDone = habits.filter(habit => habit.lastDoneDay === todayDay).length;
    const totalHabits = habits.length;

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = () => {
        if (habitInput.trim() === '') return;
        setHabits([...habits, {id: Date.now(), habit: habitInput, lastDoneDay: null}]);
        setHabitInput('');
    };

    const toggleHabits = (id) => {
        setHabits(
            habits.map(habit =>
                habit.id === id ? {...habit, lastDoneDay: habit.lastDoneDay === todayDay ? null : todayDay} : habit));
    };

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                fontFamily: 'Arial, sans-serif',
                padding: '20px'
            }}
        >
            <h2>Трекер привычек</h2>

            <div style={{marginBottom: '15px'}}>
                Выполнено сегодня: {todayDayDone} из {totalHabits}
            </div>

            <div style={{marginBottom: '20px'}}>
                <input
                    placeholder="Новая привычка"
                    style={{
                        padding: '8px',
                        fontSize: '14px',
                        width: '250px',
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}
                    value={habitInput}
                    onChange={(event) => setHabitInput(event.target.value)}
                />
                <button
                    onClick={addHabit}
                    style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '1px solid black',
                        backgroundColor: '#ffff',
                        color: 'black',
                        cursor: 'pointer'
                    }}
                >Добавить
                </button>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '350px'}}>
                {habits.map((habit) => (
                    <div key={habit.id} style={{display: 'flex', alignItems: 'center'}}>
                       
                        <div
                            style={{
                                flexGrow: 1,
                                padding: '10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: habit.lastDoneDay === todayDay ? '#d4edda' : '#f9f9f9'
                            }}
                        >{habit.habit}
                        </div>

                        <button
                            onClick={() => toggleHabits(habit.id)}
                            style={{
                                marginLeft: '10px',
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: habit.lastDoneDay === todayDay ? '#4CAF50' : '#ccc',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            {habit.lastDoneDay === todayDay ? 'Выполнено сегодня' : 'Нужно сделать'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HabitTracker;