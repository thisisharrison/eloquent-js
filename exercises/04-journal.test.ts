import { tableFor, phi, peanutTeeth } from "./04-journal";

test("tableFor", () => {
    expect(tableFor("pizza")).toEqual([76, 9, 4, 1]);
});

test("phi", () => {
    expect(phi([76, 9, 4, 1])).toBe(0.06859943405700354);
});

test("peanutTeeth", () => {
    expect(peanutTeeth()).toBe(1);
});
