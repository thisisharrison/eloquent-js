export function every<T>(array: T[], test: (arg: T) => boolean): boolean {
    for (let i = 0; i < array.length; i++) {
        if (!test(array[i])) {
            return false;
        }
    }
    return true;
}

export function everyWithSome<T>(array: T[], test: (arg: T) => boolean): boolean {
    return array.some((el) => !test(el)) ? false : true;
}
