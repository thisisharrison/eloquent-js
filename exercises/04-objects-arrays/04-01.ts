export function range(start: number, end: number, step?: number): number[] {
    let result = [];
    let realStep = step ? step : 1;
    if (start > end) {
        for (let i = start; i >= end; i += realStep) {
            result.push(i);
        }
    } else {
        for (let i = start; i <= end; i += realStep) {
            result.push(i);
        }
    }
    return result;
}

export function sum(arr: number[]): number {
    return arr.reduce((acc, cur) => (acc += cur));
}
