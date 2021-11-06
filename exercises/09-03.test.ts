test("numbers", () => {
    // (\d+(\.\d*)?|\.\d+) -> 0.5 or .5
    // ([eE][+|-]?) -> e, E, e+, e-, E+, E-
    let number = /^[+|-]?(\d+(\.\d*)?|\.\d+)([eE][+|-]?\d+)?$/;

    for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
        expect(str).toMatch(number);
    }
    for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
        expect(str).not.toMatch(number);
    }
});
