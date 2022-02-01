import { range, sum } from "./04-01";

test("range", () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(5, 2, -1)).toEqual([5, 4, 3, 2]);
});

test("sum", () => {
    expect(sum(range(1, 10))).toBe(55);
});
