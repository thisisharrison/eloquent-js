import { every, everyWithSome } from "./05-03";

test("every", () => {
    expect(every([1, 3, 5], (n) => n < 10)).toBeTruthy();
    expect(every([2, 4, 16], (n) => n < 10)).toBeFalsy();
    expect(every([], (n) => n < 10)).toBeTruthy();
});

test("everyWithSome", () => {
    expect(everyWithSome([1, 3, 5], (n) => n < 10)).toBeTruthy();
    expect(everyWithSome([2, 4, 16], (n) => n < 10)).toBeFalsy();
    expect(everyWithSome([], (n) => n < 10)).toBeTruthy();
});
