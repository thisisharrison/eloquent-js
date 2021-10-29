import { forEach, unless, filter, map, reduce, some } from "./05-my-array";

jest.spyOn(global.console, "log");

test("forEach", () => {
    let arr = ["A", "B"];
    forEach(arr, (l) => console.log(l));
    expect(console.log).toHaveBeenCalledWith("A");
    expect(console.log).toHaveBeenCalledWith("B");
    // does not mutate array
    expect(arr).toEqual(["A", "B"]);
});

test("unless", () => {
    forEach([1, 2, 3], (n) => unless(n % 2 === 0, () => console.log(n)));
    expect(console.log).toHaveBeenCalledWith(1);
    expect(console.log).toHaveBeenCalledWith(3);
});

test("filter", () => {
    let arr = [1, 2, 3, 4, 5];
    expect(filter(arr, (n) => n % 2 === 0)).toEqual([2, 4]);
    // does not mutate array
    expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test("map", () => {
    let arr = [1, 2, 3, 4, 5];
    expect(map(arr, (n) => n * 2)).toEqual([2, 4, 6, 8, 10]);
    // does not mutate array
    expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test("reduce", () => {
    expect(reduce([1, 2, 3, 4, 5], (acc, cur) => (acc += cur), 0)).toBe(15);
    // TODO: typing reduce for no initial value given
    // expect(reduce([1, 2, 3, 4, 5], (acc, cur) => (acc += cur))).toBe(16);
    // Use reduce to find the max number
    expect(reduce([1, 2, 3, 4, 5], (prev, cur) => (prev > cur ? prev : cur), -Infinity)).toBe(5);
});

test("some", () => {
    let arr = [1, 2, 3, 4, 5];
    expect(some(arr, (n) => n % 2 === 0)).toBeTruthy();
    let arr2 = [1, 3, 5];
    expect(some(arr2, (n) => n % 2 === 0)).toBeFalsy();
});
