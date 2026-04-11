import { useState, useEffect } from 'react';

// Задача 2. Тёмная тема
// Создай переключатель темы: кнопка «Тёмная тема / Светлая тема». Сохраняй выбор
// пользователя в localStorage (ключ 'theme'). При перезагрузке страницы тема должна
// восстанавливаться. Применяй тему через style на корневой div.

function DarkTheme() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');

            if (saved) {
                return 'light';
            }
    });
        useEffect(() => {
            localStorage.setItem('theme', theme);
        }, [theme]);

        const toggleTheme = () => {
            setTheme(theme === 'light' ? 'dark' : 'light')
        };
        return (
            <div style={{
                backgroundColor: theme === 'light' ? '#f1eaea' : '#1f2937',
                color: theme === 'light' ? '#1f2937' : '#f1eaea',
                minHeight: '100vh',
                padding: '20px'
            }}>
                <h2>Тема: {theme}</h2>
                <button onClick={toggleTheme}>Изменить тему</button>
            </div>
        )
};
export default DarkTheme;