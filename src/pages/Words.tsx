import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { words as wordsDictionary } from '../dictionary/words';
import { equal, shuffle } from '../utils';
import { Input } from '../ui/Input';
import ConfettiExplosion from 'react-confetti-explosion';
import { ALL_LESSONS, allLessons, Lesson } from '../model/Lesson';
import { Word } from '../model/Word';

export const Words = () => {

    const [words, setWords] = useState(wordsDictionary.LESSON_1);
    const [category, setCategory] = useState<Lesson | typeof ALL_LESSONS>(Lesson.LESSON_1);
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const selectedWord = words[counter];

    const setupWord = () => {
        setValue('');
        setCounter(v => v >= words.length - 1 ? 0 : v + 1);
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

    useEffect(() => {
        if (category === ALL_LESSONS) {
            const allWords: Word[] = allLessons.reduce((all: Word[], lesson) => [...all, ...wordsDictionary[lesson as Lesson]], []);
            setWords([...shuffle(allWords)]);
        } else {
            setWords([...shuffle(wordsDictionary[category])]);
        }
    }, [category])

    return (
        <div className="content">
            <h2>
                Przetłumacz ({counter + 1}/{words.length}){' '}
                <span onClick={() => setShowAnswer(v => !v)}>
                    {success ? '😍' : showAnswer ? '🙊' : '🙈'}
                </span>
            </h2>
            <select onChange={(e) => setCategory(e.target.value as Lesson)} value={category}>
                <option value={Lesson.LESSON_1}>Lekcja 1</option>
                <option value={Lesson.LESSON_2}>Lekcja 2</option>
                <option value={Lesson.LESSON_3}>Lekcja 3</option>
                <option value={Lesson.LESSON_4}>Lekcja 4</option>
                <option value={Lesson.LESSON_4_HUMAN_DESCRIPTION}>Lekcja 4 (opis człowieka)</option>
                <option value={ALL_LESSONS}>Całość</option>
            </select>
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

            {success && <div className="centered"><ConfettiExplosion/></div>}

            <button className={success ? 'check' : undefined} onClick={success ? setupWord : checkWord}>
                {success ? 'Dalej' : 'Sprawdź'}
            </button>
            <Link to="/">« Powrót</Link>

        </div>
    )
}