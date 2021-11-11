import { Promise_all, Promise_all1 } from "./11-02";

jest.spyOn(global.console, "log");

test("empty array", async () => {
    await Promise_all([]).then((array) => {
        console.log("This should be []:", array);
    });
    expect(console.log).toHaveBeenCalledWith("This should be []:", []);
});

function soon(val: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(val), Math.random() * 100);
    });
}

test("all succeed", async () => {
    await Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
        console.log("This should be [1, 2, 3]:", array);
    });
    expect(console.log).toHaveBeenCalledWith("This should be [1, 2, 3]:", expect.arrayContaining([1, 2, 3]));
});

test("error with `then` `catch`", async () => {
    await Promise_all([soon(1), Promise.reject("X"), soon(3)])
        .then((array) => {
            console.log("We should not get here");
        })
        .catch((error) => {
            if (error != "X") {
                console.log("Unexpected failure:", error);
            } else {
                console.log(`Failure X: ${error}`);
            }
        });

    expect(console.log).toHaveBeenCalledWith("Failure X: X");
});

test("error with `try` `catch`", async () => {
    await Promise_all1([soon(1), Promise.reject("X"), soon(3)])
        .then((array) => {
            console.log("We should not get here");
        })
        .catch((error) => {
            if (error != "X") {
                console.log("Unexpected failure:", error);
            } else {
                console.log(`Failure X: ${error}`);
            }
        });

    expect(console.log).toHaveBeenCalledWith("Failure X: X");
});
