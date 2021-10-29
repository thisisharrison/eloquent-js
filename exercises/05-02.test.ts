import { loop, whileLoop } from "./05-02";

jest.spyOn(global.console, "log");

test("loop", () => {
    loop(
        3,
        (n) => n > 0,
        (n) => n - 1,
        console.log
    );
    expect(console.log).toHaveBeenCalledWith(3);
    expect(console.log).toHaveBeenCalledWith(2);
    expect(console.log).toHaveBeenCalledWith(1);
});

test("whileLoop", () => {
    whileLoop(
        3,
        (n) => n > 0,
        (n) => n - 1,
        console.log
    );
    expect(console.log).toHaveBeenCalledWith(3);
    expect(console.log).toHaveBeenCalledWith(2);
    expect(console.log).toHaveBeenCalledWith(1);
});
