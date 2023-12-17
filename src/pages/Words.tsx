import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { words as wordsDictionary } from '../dictionary/words';
import { equal } from '../utils';
import { Input } from '../ui/Input';
import ConfettiExplosion from 'react-confetti-explosion';
import { ALL_LESSONS, allLessons, Lesson } from '../model/Lesson';
import { CategorizedWords, Word } from '../model/Word';

const MARKED_WORDS_KEY = 'markedWords';

export const Words = () => {

    const storedMarkedWords: string[] = JSON.parse(localStorage.getItem(MARKED_WORDS_KEY) || '[]');

    const [words, setWords] = useState(wordsDictionary.LESSON_1);
    const [category, setCategory] = useState<Lesson | typeof ALL_LESSONS>(Lesson.LESSON_1);
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [markedWords, setMarkedWords] = useState(storedMarkedWords);

    const goNext = () => {
        setCounter(v => v >= words.length - 1 ? 0 : v + 1);
    }

    const goPrev = () => {
        setCounter(v => v === 0 ? words.length - 1 : v - 1);
    }

    const setupWord = () => {
        setValue('');
        setError(false);
        setSuccess(false);
        setShowAnswer(false);
        goNext();
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

    const toggleMarkWord = () => {
        if (markedWords.includes(selectedWord.ru)) {
            setMarkedWords(current => {
                const newWords = current.filter(w => w !== selectedWord.ru);
                localStorage.setItem(MARKED_WORDS_KEY, JSON.stringify(newWords));
                return newWords;
            });
        } else {
            setMarkedWords(current => {
                const newWords = [...current, selectedWord.ru];
                localStorage.setItem(MARKED_WORDS_KEY, JSON.stringify(newWords));
                return newWords;
            });
        }
    }

    useEffect(() => {
        const allWords: Word[] = allLessons.reduce((all: Word[], lesson) => [...all, ...wordsDictionary[lesson as Lesson]], []);
        if (category === ALL_LESSONS) {
            setWords([...allWords]);
        } else if (category === Lesson.MARKED) {
            setWords([...allWords.filter(w => markedWords.includes(w.ru))]);
        } else {
            setWords([...wordsDictionary[category as keyof CategorizedWords]]);
        }
        setCounter(0);
    }, [category, markedWords]);

    const selectedWord = words[counter];

    const menu = (
        <select onChange={(e) => setCategory(e.target.value as Lesson)} value={category}>
            <option value={Lesson.LESSON_1}>Lekcja 1</option>
            <option value={Lesson.LESSON_2}>Lekcja 2</option>
            <option value={Lesson.LESSON_3}>Lekcja 3</option>
            <option value={Lesson.LESSON_4}>Lekcja 4</option>
            <option value={Lesson.LESSON_4_HUMAN_DESCRIPTION}>Lekcja 4 (opis człowieka)</option>
            <option value={Lesson.LESSON_5}>Lekcja 5</option>
            <option value={Lesson.LESSON_5_NUMBERS}>Lekcja 5 (numery 1-20)</option>
            <option value={Lesson.LESSON_5_OPINIONS}>Lekcja 5 (rady, opinie)</option>
            <option value={Lesson.MARKED} disabled={markedWords.length === 0}>Oznaczone flagą
                ({markedWords.length})
            </option>
            <option value={ALL_LESSONS}>Całość</option>
        </select>);

    if (!selectedWord) {
        return menu;
    }

    const isMarked = markedWords.includes(selectedWord.ru);

    return (
        <div className="content">
            <h2 style={{whiteSpace: 'nowrap'}}>
                <a href="#" onClick={goPrev}>&laquo;</a>{' '}
                Przetłumacz ({counter + 1}/{words.length}){' '}
                <span onClick={() => setShowAnswer(v => !v)}>
                    {success ? '😍' : showAnswer ? '🙊' : '🙈'}
                </span>{' '}
                <span onClick={toggleMarkWord} style={{ color: isMarked ? 'red' : 'gray' }}>
                    ⚑
                </span>{' '}
                <a href="#" onClick={goNext}>&raquo;</a>
            </h2>
            {menu}
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