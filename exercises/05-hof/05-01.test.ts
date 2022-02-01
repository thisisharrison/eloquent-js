import flatten from "./05-01";

test("flatten", () => {
    let arrays = [[1, 2, 3], [4, 5], [6]];
    // Your code here.
    expect(flatten(arrays)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(arrays).toEqual([[1, 2, 3], [4, 5], [6]]);
});
