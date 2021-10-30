test("fix the hasOwnProperty", () => {
    let map = { one: true, two: true, hasOwnProperty: true };

    // Below line has error
    // map.hasOwnProperty("one")

    // How to fix it: Use prototype's hasOwnProperty and bind `map` to `this` with call
    expect(Object.prototype.hasOwnProperty.call(map, "one")).toBeTruthy();
});
