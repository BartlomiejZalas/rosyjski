import { Lesson } from './Lesson';

export interface Word {
    ru: string;
    pl: string;
}

export type CategorizedWords = Record<Lesson, Word[]>