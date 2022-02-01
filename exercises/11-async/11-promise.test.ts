jest.spyOn(global.console, "log");
jest.spyOn(global.console, "error");

describe("promises", () => {
    test("`then`should return another promise", () => {
        const promise = Promise.resolve(1);
        const thenOnce = promise.then((value) => value + 1);
        const thenTwice = thenOnce.then((value) => value + 1);
        expect(thenTwice).resolves.toBe(3);
        expect(thenTwice instanceof Promise).toBeTruthy();
    });

    test("using the constructor", () => {
        const sleep = (ms: number) => new Promise<string>((resolve) => setTimeout(() => resolve("done"), ms));
        const result = sleep(10).then((response) => response + "!!!");
        expect(result).resolves.toBe("done!!!");
    });

    test("`then`'s rejection handler", async () => {
        const sleep = (ms: number) => new Promise((_, reject) => setTimeout(() => reject("error"), ms));
        await sleep(10).then(
            (result) => console.log(result),
            (error) => console.log(error)
        );
        expect(console.log).toHaveBeenCalledWith("error");
    });

    test("should execute onRejected, ignore catch", async () => {
        const bad = await Promise.reject(1)
            .then(
                (value) => value + 10, // Ignored
                (error) => error + 100 // <- Executed
            )
            .catch((reason) => reason + 1000); // Ignored

        expect(bad).toBe(101);
    });

    test("should ignore then and catch", async () => {
        const bad2 = await Promise.reject(1)
            .then(
                (value) => value + 10 // Ignored
            )
            .catch((reason) => reason + 1000); // <- Executed

        expect(bad2).toBe(1001);
    });

    test("should ignore then, execture catch and then", async () => {
        const bad3 = await Promise.reject(1)
            .then(
                (value) => value + 10 // Ignored
            )
            .catch((reason) => reason + 100) // <- Executed
            .then((value) => value + 1000); // <- Executed!!!

        expect(bad3).toBe(1101);
    });

    test("should execture onFulfilled", async () => {
        await Promise.resolve("GOOD")
            .then(
                (value) => console.log(value + "!!!"),
                (error) => new Error(error + "???") // Ignored
            )
            .catch((reason) => console.log(reason)); // Ignored

        expect(console.log).toHaveBeenCalledWith("GOOD!!!");
    });

    test("finally doesn't take values nor return values", async () => {
        const promise = new Promise<number>((res) => res(2));
        await promise
            .then((v) => {
                console.log(v);
                return v * 2;
            })
            .then((v) => {
                console.log(v);
                return v * 2;
            })
            // @ts-expect-error
            // finally(onfinally?: (() => void) | null | undefined)
            // -> (1) function no arg, returns void, or null, or undefined
            .finally((v) => {
                console.log(v);
                return v * 2;
            })
            .then((v) => {
                console.log(v);
            });

        expect(console.log).toHaveBeenCalledWith(2);
        expect(console.log).toHaveBeenCalledWith(4);
        expect(console.log).toHaveBeenCalledWith(undefined);
        expect(console.log).toHaveBeenCalledWith(8);
    });

    test("test understanding", async () => {
        function job(state: boolean) {
            return new Promise(function (resolve, reject) {
                if (state) {
                    resolve("success");
                } else {
                    reject("error");
                }
            });
        }

        let promise = job(true);

        await promise
            .then(function (data) {
                console.log(data); // <- Executed (success)
                return job(true);
            })
            .then(function (data) {
                if (data !== "victory") {
                    throw "Defeat"; // <- Executed
                }
                return job(true);
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error); // <- Executed (Defeat)
                return job(false);
            })
            .then(function (data) {
                console.log(data);
                return job(true);
            })
            .catch(function (error) {
                console.log(error); // <- Executed (error)
                return "Error caught";
            })
            .then(function (data) {
                console.log(data); // <- Executed (Error caught)
                return new Error("test"); // return Error for the `then` handler. If it was `throw` then it would be in `catch`
            })
            .then(function (data) {
                console.log("Success:", data.message); // <- Executed (Success: test)
            })
            .catch(function (data) {
                console.log("Error:", data.message);
            });

        expect(console.log).toHaveBeenCalledWith("success");
        expect(console.log).toHaveBeenCalledWith("Defeat");
        expect(console.log).toHaveBeenCalledWith("error");
        expect(console.log).toHaveBeenCalledWith("Error caught");
        expect(console.log).toHaveBeenLastCalledWith("Success:", "test");
    });

    test("catch handlers won't be on the stack", async () => {
        jest.useFakeTimers();
        jest.spyOn(global, "setTimeout");

        async function test() {
            try {
                setTimeout(() => {
                    throw new Error("boo!");
                }, 10);
            } catch (error) {
                console.log("Caught!"); // <- not Caught
            }
        }

        test();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        // TODO: write test
        // await expect(test).toThrowError("boo!");
        expect(console.log).not.toHaveBeenCalled();
    });
});
