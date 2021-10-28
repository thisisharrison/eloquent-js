import { deepEqual } from "./04-04";

test("deepEqual", () => {
    let obj = { here: { is: "an" }, object: 2 };
    expect(deepEqual(obj, obj)).toBeTruthy();
    expect(deepEqual(obj, { here: 1, object: 2 })).toBeFalsy();
    expect(deepEqual(obj, { here: { is: "an" }, object: 2 })).toBeTruthy();
    // test for null
    let obj2 = { here: null, is: { an: "object" }, which: "is", number: { no: 2 } };
    expect(deepEqual(obj2, obj2)).toBeTruthy();
});
