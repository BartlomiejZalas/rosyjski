export const equal = (w1: string, w2: string) => {
    return w1.toLowerCase().trim() === w2.toLowerCase().trim();
}

export const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}