export function forEach<T>(array: T[], action: (arg: T) => void) {
    for (let i of array) {
        action(i);
    }
}

export function unless(test: boolean, then: () => void) {
    if (!test) then();
}

export function filter<T, U>(array: T[], test: (arg: T) => boolean) {
    let passed = [];
    for (let i of array) {
        if (test(i)) {
            passed.push(i);
        }
    }
    return passed;
}

export function map<T, U>(array: T[], transform: (arg: T) => U) {
    let mapped = [];
    for (let i of array) {
        mapped.push(transform(i));
    }
    return mapped;
}

export function reduce<T, U>(array: T[], combine: (prevValue: U | T, currVal: T) => U, start: U | T) {
    let acc = start;
    for (let cur of array) {
        acc = combine(acc, cur);
    }
    return acc;
}

export function some<T>(array: T[], test: (arg: T) => boolean) {
    for (const i of array) {
        if (test(i)) return true;
    }
    return false;
}
