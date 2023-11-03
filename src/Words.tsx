import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { words } from './dictionary/words';
import { equal } from './utils';
import { Input } from './ui/Input';

export const Words = () => {

    const [selectedWord, setSelectedWord] = useState(words[0]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const initializeWord = () => {
        const randWordIndex = Math.floor(Math.random() * words.length);
        setSelectedWord(words[randWordIndex]);
        setError(false);
        setValue('');
        setSuccess(false);
        setShowAnswer(false);
    }

    const checkWord = () => {
        if (equal(value, selectedWord.ru)) {
            setSuccess(true);
            setError(false);
        } else {
            setSuccess(false);
            setError(true);
        }
    }

    useEffect(() => {
        initializeWord();
    }, []);

    return (
        <div className="content">
            <h2>
                Przetłumacz{' '}
                <span onClick={() => setShowAnswer(v => !v)}>
                    {success ? '😍' : showAnswer ? '🙊' : '🙈'}
                </span>
            </h2>
            <h3>
                {showAnswer ? selectedWord.ru : selectedWord.pl}
            </h3>

            <Input
                placeholder=""
                error={error}
                success={success}
                value={value}
                onChange={v => {
                    setValue(v);
                    setError(false);
                }}
            />
            <button className={success ? 'check' : undefined} onClick={success ? initializeWord : checkWord}>
                {success ? 'Dalej' : 'Sprawdź'}
            </button>
            <Link to="/">« Powrót</Link>
        </div>
    )
}