import isEven from "./03-02";

test("isEven", () => {
    expect(isEven(50)).toBeTruthy();

    expect(isEven(75)).toBeFalsy();

    // @ts-ignore
    expect(isEven(-1)).toBeFalsy();
});
