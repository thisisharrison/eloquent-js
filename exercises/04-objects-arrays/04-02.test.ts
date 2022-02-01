import { reverseArray, reverseArrayInPlace } from "./04-02";

test("reverseArray", () => {
    expect(reverseArray(["A", "B", "C"])).toEqual(["C", "B", "A"]);
});

test("reverseArrayInPlace", () => {
    let arrayValue = [1, 2, 3, 4, 5];
    reverseArrayInPlace(arrayValue);
    expect(arrayValue).toEqual([5, 4, 3, 2, 1]);
});
