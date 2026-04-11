import { useState, useEffect } from 'react';

// Задача 1. Сохранение имени пользователя
// Создай компонент NameInput с полем ввода. При вводе текста сохраняй его в localStorage
// по ключу 'username'. При следующем открытии страницы поле должно быть уже заполнено
// сохранённым именем.

function NameInput() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('username');

        if (saved !== null) {
            return JSON.parse(saved);
        }
        return { name: '' };
    });

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(user));
    }, [user]);

    return (
        <div>
            <h2>Имя пользователя:</h2>
            <input
                value={user.name}
                onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                }
                placeholder='Введите имя: '
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
            />
            <p>{user.name}</p>
        </div>
    );
}

export default NameInput;