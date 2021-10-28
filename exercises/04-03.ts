// sample list:
// let list = {
//     value: 1,
//     rest: {
//         value: 2,
//         rest: {
//             value: 3,
//             rest: null,
//         },
//     },
// };
type List = {
    value: number;
    rest: List | null;
};

export function arrayToList(arr: number[]): List | null {
    if (arr.length === 0) return null;
    return { value: arr[0], rest: arrayToList(arr.slice(1)) };
}

export function arrayToListIter(arr: number[]): List | null {
    let list = null;
    // Go backwards as last element is null
    for (let i = arr.length - 1; i >= 0; i--) {
        list = { value: arr[i], rest: list };
    }
    return list;
}

export function listToArray(list: List | null): number[] {
    if (!list) return [];
    if (!list.rest) return [list.value];
    return [list.value, ...listToArray(list.rest)];
}

export function listToArrayIter(list: List | null): number[] {
    if (!list) return [];
    const result = [];
    for (let node: List | null = list; node !== null; node = node.rest) {
        result.push(node.value);
    }
    return result;
}

export function prepend(value: number, list: List | null): List {
    return { value, rest: list };
}

export function nth(list: List | null, position: number): number {
    if (!list) return -1;
    if (position === 0) return list.value;
    return nth(list.rest, position - 1);
}
