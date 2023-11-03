import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { conjugations } from './dictionary/conjugations';
import { equal } from './utils';
import { Input } from './ui/Input';

export const Conjugation = () => {

    const [selectedWord, setSelectedWord] = useState(conjugations[0]);
    const [errors, setErrors] = useState([false, false, false, false, false, false]);
    const [success, setSuccess] = useState([false, false, false, false, false, false]);
    const [value, setValue] = useState(['', '', '', '', '', '']);
    const [showAnswer, setShowAnswer] = useState(false);

    const allOk = success.every(s => s);

    const initializeWord = () => {
        const randWordIndex = Math.floor(Math.random() * conjugations.length);
        setSelectedWord(conjugations[randWordIndex]);
        setValue(['', '', '', '', '', '']);
        setErrors([false, false, false, false, false, false]);
        setSuccess([false, false, false, false, false, false]);
        setShowAnswer(false);
    }

    const checkRow = (index: number) => {
        if (equal(value[index], selectedWord.ru[index])) {
            setErrors(e => e.map((s, i) => i === index ? false : s));
            setSuccess(e => e.map((s, i) => i === index ? true : s));
        } else {
            setErrors(e => e.map((s, i) => i === index ? true : s));
            setSuccess(e => e.map((s, i) => i === index ? false : s));
        }
    }

    const check = () => {
        checkRow(0);
        checkRow(1);
        checkRow(2);
        checkRow(3);
        checkRow(4);
        checkRow(5);
    }

    const handleOnChange = (index: number, value: string) => {
        setValue(values => values.map((v, i) => i === index ? value : v));
        setErrors(values => values.map((v, i) => i === index ? false : v));
    }

    useEffect(() => {
        initializeWord();
    }, []);

    return (
        <div className="content">

            <h2>Odmień{' '}
                <span onClick={() => setShowAnswer(v => !v)}>
                    {allOk ? '😍' : showAnswer ? '🙊' : '🙈'}
                </span>
            </h2>
            <h3>{showAnswer ? selectedWord.ru.join(' ') : selectedWord.base}</h3>
            <Input placeholder="я" value={value[0]} onChange={(v) => handleOnChange(0, v)} error={errors[0]}
                   success={success[0]}/>
            <Input placeholder="ты" value={value[1]} onChange={(v) => handleOnChange(1, v)} error={errors[1]}
                   success={success[1]}/>
            <Input placeholder="он" value={value[2]} onChange={(v) => handleOnChange(2, v)} error={errors[2]}
                   success={success[2]}/>
            <Input placeholder="мы" value={value[3]} onChange={(v) => handleOnChange(3, v)} error={errors[3]}
                   success={success[3]}/>
            <Input placeholder="вы" value={value[4]} onChange={(v) => handleOnChange(4, v)} error={errors[4]}
                   success={success[4]}/>
            <Input placeholder="они" value={value[5]} onChange={(v) => handleOnChange(5, v)} error={errors[5]}
                   success={success[5]}/>

            <button className={allOk ? 'check' : undefined} onClick={allOk ? initializeWord : check}>
                {allOk ? 'Dalej' : 'Sprawdź'}
            </button>
            <Link to="/">« Powrót</Link>
        </div>
    )
}