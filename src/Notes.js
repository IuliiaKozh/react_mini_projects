import { useState, useEffect } from 'react';

// Задача 5. Заметки
// Создай простой редактор заметок: textarea + кнопка «Сохранить». При нажатии кнопки —
// сохраняй текст в localStorage. При открытии страницы — автоматически загружай
// последнюю заметку. Показывай время последнего сохранения.

function Notes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('notes');
        return saved ? JSON.parse(saved) : [];
    });
    const [lastNote, setLastNote] = useState(() => {
        const saved = localStorage.getItem('lastNote');
        return saved ? JSON.parse(saved) : null;
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNotes = () => {
        if (input.trim() === '') return;

        const newNote = { id: Date.now(), text: input, done: false };
        setNotes([...notes, newNote]);
        setLastNote(newNote);
        localStorage.setItem('lastNote', JSON.stringify(newNote));
        setInput('');
    };

    const lastModifiedDate = document.lastModified;

    return (
        <div style={{padding:'20px', maxWidth:'300px', margin:'auto'}}>
            <h2>Заметки:</h2>

            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                style={{padding: '8px', width: '150px', marginRight: '10px'}}
                placeholder='Введите заметку...'
            />

            <button onClick={addNotes}>Сохранить</button>
            <p>Последнее изменение страницы: {lastModifiedDate}</p>

            <ul>
                {notes.map(note => (
                    <li key={note.id}>{note.text}</li>
                ))}
            </ul>
                
                <div style={{marginTop:'10px', padding:'10px'}}>
                    <p>Последняя заметка:</p>
                    <p>{lastNote.text}</p>
                </div>
                
        </div>
    );
}

export default Notes;