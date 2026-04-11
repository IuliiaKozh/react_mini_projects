 import { useState, useEffect } from 'react';

// Задача 3. Список покупок
// Создай приложение «Список покупок»: поле ввода + кнопка «Добавить». Каждый элемент в
// списке имеет кнопку «✓» (пометить купленным — зачеркнуть) и «✕» (удалить). Весь список
// сохраняется в localStorage.


function ShoppingList() {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('items');
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (input.trim() === '') return;
        setItems([...items, {id: Date.now(), text: input, done: false}]);
        setInput('');
    };

    const toggleItem = (id) => {
        setItems(items.map(item => item.id === id ? {...item, done: !item.done} : item));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div style={{padding:'20px', maxWidth:'300px', margin:'auto'}}>
            <h2>Shopping List: </h2>

            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="items"
                style={{padding: '8px', width: '150px', marginRight: '10px'}}
            />

            <button onClick={addItem}>Add</button>

            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        style={{
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <span
                            onClick={() => toggleItem(item.id)}
                            style={{
                                textDecoration: item.done ? 'line-through' : 'none'
                            }}
                        >
                            {item.text}
                        </span>
                        <button
                            onClick={() => toggleItem(item.id)}
                            style={{marginRight: '8px'}}
                        >✓
                        </button>
                        <button onClick={() => deleteItem(item.id)}>✕</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
