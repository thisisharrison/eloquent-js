import { SCRIPTS } from "./05-scripts-data";
import { characterCount, averageOrigin, countBy, textScripts } from "./05-scripts";

test("characterCount", () => {
    expect(characterCount(SCRIPTS)).toEqual(
        expect.objectContaining({
            name: "Han",
        })
    );
});

test("averageOrigin", () => {
    expect(averageOrigin(true, SCRIPTS)).toBe(1165);
    expect(averageOrigin(false, SCRIPTS)).toBe(204);
});

test("countBy", () => {
    expect(countBy([1, 2, 3, 4, 5], (n) => n > 2)).toEqual([
        { name: false, count: 2 },
        { name: true, count: 3 },
    ]);
});

test("textScripts", () => {
    expect(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"', SCRIPTS)).toEqual("61% Han, 22% Latin, 17% Cyrillic");
});
