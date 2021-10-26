import { countBs, countChar } from "./03-03";

test("countBs", () => {
    expect(countBs("BBC")).toBe(2);

    expect(countBs("BkljsrBkljsfiBBBklsjdfBBBslkdjfBBakaB")).toBe(11);

    expect(countChar("kakkerlak", "k")).toBe(4);
});
