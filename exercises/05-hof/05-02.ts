/**
 * It takes a value, a test function, an update function, and a body function.
 * Each iteration, it first runs the test function on the current loop value
 * and stops if that returns false.
 * Then it calls the body function, giving it the current value.
 * Finally, it calls the update function to create a new value
 * and starts from the beginning.
 */

export function loop(value: number, test: (n: number) => boolean, update: (n: number) => number, body: (n: number) => void) {
    for (let i = value; test(i); i = update(i)) {
        body(i);
    }
}

export function whileLoop(value: number, test: (n: number) => boolean, update: (n: number) => number, body: (n: number) => void) {
    let curr = value;
    while (test(curr)) {
        body(curr);
        curr = update(curr);
    }
}
