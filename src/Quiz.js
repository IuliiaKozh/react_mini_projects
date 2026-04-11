import { useState, useEffect } from 'react';

// Задача 7. Тест-викторина с результатом
// Создай компонент Quiz с 3 вопросами и вариантами ответов. После прохождения —
// показывай результат (например, «2 из 3»). Сохраняй лучший результат в localStorage. При
// следующем открытии — показывай рекорд над формой.

function Quiz() {

    const questions = [
        {
            question: 'children это?',
            options: ['Контент', 'Состояние', 'Метод'],
            correct: 'Контент',
        },
        {
            question: 'useEffect принимает?',
            options: ['Функцию', 'Состояние', 'Стили'],
            correct: 'Функцию',
        },
        {
            question: 'localStorage хранит?',
            options: ['Данные', 'Функции', 'Стили'],
            correct: 'Данные',
        }
    ];
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [bestScore, setBestScore] = useState(() => {
        const saved = localStorage.getItem('bestScore');
        return saved ? JSON.parse(saved) : 0;
    });

    const handleAnswer = (index, option) => {
        setAnswers({...answers, [index]: option});
    };

    const checkResult = () => {
        let score = 0;

        if (answers[0] === questions[0].correct) {
            score++;
        }
        if (answers[1] === questions[1].correct) {
            score++;
        }
        if (answers[2] === questions[2].correct) {
            score++;
        }

        setResult(score);

        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('bestScore', JSON.stringify(score));
        } 
    };
    return (
        <div>
            <h2>Quiz</h2>

            <div>
                Лучший результат: {bestScore} из {questions.length}
            </div>

            <ol>
                {questions.map((question, index) => (
                    <li key={index} style={{ marginBottom: '15px' }}>
                    {question.question}
                    <div>
                        {question.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(index, option)}
                            style={{margin: '5px'}}
                        >
                            {option}
                        </button>
                        ))}
                    </div>
                    </li>
                ))}
            </ol>


            <button onClick={checkResult}
                style={{margin: '20px', padding: '10px'}}>Проверить</button>

            <div>
                {result !== null ? `Результат: ${result} из ${questions.length}` : ''}
            </div>
        </div>
    );
}

export default Quiz;
