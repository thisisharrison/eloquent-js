// Define a Matrix class that holds array of arrays,
// height of the array is array.length, width is a single array's length
// Define a Matrix Iterator class to make Matrix Iterable
// Use Symbol and Symbol.iterator

export class Matrix {
    width: number;
    height: number;
    content: any[];

    constructor(width: number, height: number, element: (x: number, y: number) => any) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x: number, y: number) {
        return this.content[y * this.width + x];
    }

    set(x: number, y: number, value: number) {
        this.content[y * this.width + x] = value;
    }

    [Symbol.iterator]() {
        return new MatrixIterator(this);
    }
}

class MatrixIterator {
    x: number;
    y: number;
    matrix: Matrix;

    constructor(matrix: Matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y === this.matrix.height) return { done: true };

        let value = { x: this.x, y: this.y, value: this.matrix.get(this.x, this.y) };

        this.x++;

        if (this.x === this.matrix.width) {
            this.x = 0;
            this.y++;
        }

        return { value, done: false };
    }
}

// Subclass extends Superclass
export class SymmetricMatrix extends Matrix {
    constructor(size: number, element: (x: number, y: number) => any) {
        super(size, size, (x, y) => {
            if (x < y) {
                return element(y, x);
            } else {
                return element(x, y);
            }
        });
    }

    set(x: number, y: number, value: number) {
        super.set(x, y, value);
        if (x !== y) {
            // call methods as they were in defined in the superclass
            super.set(y, x, value);
        }
    }
}
