import Vec from "./06-01";

jest.spyOn(global.console, "log");

test("Vec", () => {
    console.log(new Vec(1, 2).plus(new Vec(2, 3)));
    expect(console.log).toHaveBeenLastCalledWith({ x: 3, y: 5 });
    console.log(new Vec(1, 2).minus(new Vec(2, 3)));
    expect(console.log).toHaveBeenLastCalledWith({ x: -1, y: -1 });
    console.log(new Vec(3, 4).length);
    expect(console.log).toHaveBeenLastCalledWith(5);
});
