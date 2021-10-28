import { arrayToList, arrayToListIter, listToArray, listToArrayIter, prepend, nth } from "./04-03";

test("arrayToList", () => {
    expect(arrayToList([10, 20])).toEqual({ value: 10, rest: { value: 20, rest: null } });
});

test("listToArray", () => {
    expect(listToArray(arrayToList([10, 20, 30]))).toEqual([10, 20, 30]);
});

test("arrayToListIter", () => {
    expect(arrayToListIter([10, 20])).toEqual({ value: 10, rest: { value: 20, rest: null } });
});

test("listToArrayIter", () => {
    expect(listToArrayIter(arrayToList([10, 20, 30]))).toEqual([10, 20, 30]);
});

test("prepend", () => {
    expect(prepend(10, prepend(20, null))).toEqual({ value: 10, rest: { value: 20, rest: null } });
});

test("nth", () => {
    expect(nth(arrayToList([10, 20, 30]), 1)).toBe(20);
});
