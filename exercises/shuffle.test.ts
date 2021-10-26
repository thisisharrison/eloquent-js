import shuffleArray from "./shuffle";

test("shuffle", () => {
    let a = [1, 2, 3, 4];
    expect(shuffleArray(a)).not.toEqual([1, 2, 3, 4]);
    // shuffle in memory
    let b = [1, 2, 3, 4];
    expect(shuffleArray(b)).toBe(b);
});
