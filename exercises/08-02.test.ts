import { withBoxUnlocked } from "./08-02";
import type { Box } from "./08-02";

jest.spyOn(global.console, "log");

describe("withBoxUnlockeed", () => {
    const box: Box = {
        locked: true,
        unlock() {
            this.locked = false;
        },
        lock() {
            this.locked = true;
        },
        _content: [],
        get content() {
            if (this.locked) throw new Error("Locked!");
            return this._content;
        },
    };

    test("should push contents in and lock the box after", () => {
        withBoxUnlocked(box, function () {
            box.content.push("gold piece");
        });
        expect(box.locked).toBeTruthy();
        box.unlock();
        expect(box.content).toContain("gold piece");
        box.lock();
    });

    test("should handle exception", () => {
        try {
            withBoxUnlocked(box, function () {
                throw new Error("Pirates on the horizon! Abort!");
            });
        } catch (e) {
            console.log("Error raised: " + e);
        }
        expect(box.locked).toBeTruthy();
        expect(console.log).toBeCalledWith("Error raised: Error: Pirates on the horizon! Abort!");
    });
});
