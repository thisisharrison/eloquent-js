import min from "./03-01";

test("min", () => {
    expect(min(0, 10)).toBe(0);
    expect(min(0, -10)).toBe(-10);
});
