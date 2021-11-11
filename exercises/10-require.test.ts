import { hRequire } from "./10-require";

let addTwo: (x: number) => number;

beforeEach(() => {
    addTwo = hRequire("dummyFile");
});

describe("hRequire", () => {
    test("should import function", () => {
        expect(addTwo(2)).toBe(4);
        expect(addTwo(10)).toBe(12);
    });

    // This is what cache looks like
    test("should have stored addTwo function in cache", () => {
        expect(hRequire.cache).toEqual({
            dummyFile: { exports: addTwo },
        });
    });

    test("should only load the same file once", () => {
        const addTwoAgain = hRequire("dummyFile");
        expect(Object.keys(hRequire.cache).length).toBe(1);
    });
});
