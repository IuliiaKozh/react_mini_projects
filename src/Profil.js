import { useState, useEffect } from 'react';

// Задача 6. Профиль пользователя
// Создай форму профиля: имя, любимый цвет (select), возраст. Все поля связаны со state.
// При изменении любого поля — автоматически сохраняй весь объект профиля в localStorage
// (без кнопки «Сохранить»). При загрузке — восстанавливай все поля.

function Profil() {
    const [profil, setProfil] = useState(() => {
        const saved = localStorage.getItem('profil');
        return saved ? JSON.parse(saved) : {
            name: '',
            color: '',
            age: ''
        };
    });

    useEffect(() => {
        localStorage.setItem('profil', JSON.stringify(profil));
    }, [profil]);


    return (
        <div>
            <h2>Профиль пользователя</h2>

            <input
                placeholder="Имя"
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                value={profil.name}
                onChange={(event) =>
                    setProfil({...profil, name: event.target.value})
                }
            />

            <input
                placeholder="Любимый цвет"
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                value={profil.color}
                onChange={(event) =>
                    setProfil({...profil, color: event.target.value})
                }
            />

            <input
                placeholder="Возраст"
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                value={profil.age}
                onChange={(event) =>
                    setProfil({...profil, age: event.target.value})
                }
            />
        </div>
    );
}

export default Profil;


