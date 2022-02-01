import { Matrix, SymmetricMatrix } from "./06-matrix";

jest.spyOn(global.console, "log");

test("Matrix", () => {
    let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);

    // @ts-ignore
    for (const { x, y, value } of matrix) {
        console.log(x, y, value);
    }

    expect(console.log).toHaveBeenCalledWith(0, 0, "value 0, 0");
    expect(console.log).toHaveBeenCalledWith(1, 0, "value 1, 0");
    expect(console.log).toHaveBeenCalledWith(0, 1, "value 0, 1");
    expect(console.log).toHaveBeenCalledWith(1, 1, "value 1, 1");
});

test("SymmetricMatrix", () => {
    let matrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
    console.log(matrix.get(2, 3));
    expect(console.log).toHaveBeenCalledWith("3, 2");

    // instanceof that constructor
    expect(matrix instanceof SymmetricMatrix).toBeTruthy();
    expect(matrix instanceof Matrix).toBeTruthy();
});
