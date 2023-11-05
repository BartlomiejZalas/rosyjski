import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { conjugations as conjugationsDictionary } from '../dictionary/conjugations';
import { equal, shuffle } from '../utils';
import { Input } from '../ui/Input';
import ConfettiExplosion from 'react-confetti-explosion';

const placeholders = ['я', 'ты', 'он', 'мы', 'вы', 'они'];
const arrayOf6 = Array.from(Array(6).keys());

export const Conjugation = () => {

    const [conjugations, setConjugations] = useState(conjugationsDictionary);
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState([false, false, false, false, false, false]);
    const [success, setSuccess] = useState([false, false, false, false, false, false]);
    const [value, setValue] = useState(['', '', '', '', '', '']);
    const [showAnswer, setShowAnswer] = useState(false);

    const selectedWord = conjugations[counter];
    const allOk = success.every(s => s);

    const setupWord = () => {
        setCounter(v => v >= conjugations.length - 1 ? 0 : v + 1);
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

    const check = () => arrayOf6.forEach(i => checkRow(i));

    const handleOnChange = (index: number, value: string) => {
        setValue(values => values.map((v, i) => i === index ? value : v));
        setErrors(values => values.map((v, i) => i === index ? false : v));
    }

    useEffect(() => setConjugations([...shuffle(conjugationsDictionary)]), []);

    return (
        <div className="content">

            <h2>Odmień ({counter + 1}/{conjugationsDictionary.length}){' '}
                <span onClick={() => setShowAnswer(v => !v)}>
                    {allOk ? '😍' : showAnswer ? '🙊' : '🙈'}
                </span>
            </h2>
            <h3>{showAnswer ? selectedWord.ru.join(' ') : selectedWord.base}</h3>

            {arrayOf6.map(i => (
                <Input
                    placeholder={placeholders[i]}
                    value={value[i]}
                    onChange={(v) => handleOnChange(i, v)}
                    error={errors[i]}
                    success={success[i]}/>
            ))}
            {allOk && <div className="centered"><ConfettiExplosion /></div>}
            <button className={allOk ? 'check' : undefined} onClick={allOk ? setupWord : check}>
                {allOk ? 'Dalej' : 'Sprawdź'}
            </button>
            <Link to="/">« Powrót</Link>
        </div>
    )
}