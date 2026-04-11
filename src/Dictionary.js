import { useState, useEffect } from 'react';

// Задача 9. Словарь иностранных слов
// Создай приложение для изучения слов: поля «Слово» и «Перевод» + кнопка «Добавить».
// Слова отображаются в виде карточек. Кнопка «Перевернуть» скрывает/показывает перевод.
// Все слова хранятся в localStorage. Добавь возможность удалять слова.

function Dictionary() {
    const [words, setWords] = useState(() => {
        const saved = localStorage.getItem('words');
        return saved ? JSON.parse(saved) : [];
    });

    const [inputWord, setInputWord] = useState('');
    const [inputTranslation, setInputTranslation] = useState('');

    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
    }, [words]);

    const addWord = () => {
        if (inputWord.trim() === '' || inputTranslation.trim() === '') return;
        setWords([...words, {id: Date.now(), word: inputWord, translation: inputTranslation, show: false}]);
        setInputWord('')
        setInputTranslation('')
    };

    const toggleTranslation = (id) => {
        setWords(words.map (word => word.id === id ? {...word, show: !word.show} : word));
    };

    const deleteWord = (id) => {
        setWords(words.filter(word => word.id !== id))
    };

    return(
        <div>
            <h2>Словарь</h2>

            <input
                placeholder="слово"
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                value={inputWord}
                onChange={(event) =>
                    setInputWord(event.target.value)
                }
            />

            <input
                placeholder="перевод"
                style={{
                    padding: '7px',
                    fontSize: '13px',
                    width: '300px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                value={inputTranslation}
                onChange={(event) =>
                    setInputTranslation(event.target.value)
                }
            />
            <button onClick={addWord}
                style={{margin: '20px', padding: '10px'}}>Добавить слово
            </button>


            <div>
                {words.map(word => (
                    <div key={word.id}>
                        <p>{word.show ? word.translation : word.word}</p>
                        <button onClick={() => toggleTranslation(word.id)}>Перевернуть слово</button>
                        <button onClick={() => deleteWord(word.id)}>Удалить слово</button>
                    </div>  
                ))}
            </div>
        </div>
    )


}
export default Dictionary;