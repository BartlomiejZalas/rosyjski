import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { words as wordsDictionary } from '../dictionary/words';
import { equal, shuffle } from '../utils';
import { Input } from '../ui/Input';
import ConfettiExplosion from 'react-confetti-explosion';


export const Words = () => {

    const [words, setWords] = useState(wordsDictionary);
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const selectedWord = words[counter];

    const setupWord = () => {
        setValue('');
        setCounter(v => v >= wordsDictionary.length - 1 ? 0 : v + 1);
        setError(false);
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

    useEffect(() => setWords([...shuffle(wordsDictionary)]), []);

    return (
        <div className="content">
            <h2>
                Przetłumacz ({counter + 1}/{wordsDictionary.length}){' '}
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

            {success && <div className="centered"><ConfettiExplosion /></div>}

            <button className={success ? 'check' : undefined} onClick={success ? setupWord : checkWord}>
                {success ? 'Dalej' : 'Sprawdź'}
            </button>
            <Link to="/">« Powrót</Link>

        </div>
    )
}