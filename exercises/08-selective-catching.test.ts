import { InputError, promptDirection } from "./08-selective-catching";

jest.spyOn(global.console, "log");

test("should throw InputError", () => {
    try {
        let dir = promptDirection("123");
        console.log("You chose ", dir);
    } catch (e) {
        if (e instanceof InputError) {
            console.log("Not a valid direction. Try again.");
        } else {
            throw e;
        }
    }

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith("Not a valid direction. Try again.");
});

test("should throw undefined", () => {
    function run() {
        try {
            // @ts-expect-error
            let dir = prompDirection("123");
            console.log("You chose ", dir);
        } catch (e) {
            if (e instanceof InputError) {
                console.log("Not a valid direction. Try again.");
            } else {
                throw e;
            }
        }
    }

    expect(run).toThrowError("prompDirection is not defined");
});
