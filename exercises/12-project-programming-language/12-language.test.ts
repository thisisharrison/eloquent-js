import { parse, evaluate, globalScope, run } from "./12-language";

jest.spyOn(global.console, "log");

test("parse", () => {
    const program = "+(a, 10)";

    expect(parse(program)).toStrictEqual({
        type: "apply",
        operator: { type: "word", name: "+" },
        args: [
            { type: "word", name: "a" },
            { type: "value", value: 10 },
        ],
    });

    const program1 = ">(x, 5)";

    expect(parse(program1)).toStrictEqual({
        type: "apply",
        operator: { type: "word", name: ">" },
        args: [
            { type: "word", name: "x" },
            { type: "value", value: 5 },
        ],
    });

    const program2 = ">(x, 5";

    expect(() => {
        parse(program2);
    }).toThrow(SyntaxError);
});

test("globalScope", () => {
    globalScope.true = true;
    globalScope.false = false;

    // if true, return globalScope's false, evaluate to false
    const expression = parse(`if(true, false, true)`);
    expect(evaluate(expression, globalScope)).toBeFalsy();
});

test("run", () => {
    // 1 + 2 + 3 + ... + 10
    expect(
        run(`
        do(define(total, 0),
        define(count, 1),
        while(<(count, 11),
                do(define(total, +(total, count)),
                    define(count, +(count, 1)))),
        print(total))
    `)
    ).toBe(55);
});

test("fun", () => {
    run(`
    do(define(plusOne, fun(a, +(a, 1))),
    print(plusOne(10)))
    `);
    expect(console.log).toHaveBeenLastCalledWith(11);

    // looks like lisp...
    run(`
    do(define(pow, fun(base, exp,
        if(==(exp, 0),
            1,
            *(base, pow(base, -(exp, 1)))))),
    print(pow(2, 10)))
    `);
    expect(console.log).toHaveBeenLastCalledWith(1024);
});

test("array", () => {
    const expression = parse("array(1, 2 ,3)");
    console.log("@@@ARRAY\n", expression);

    expect(evaluate(expression, globalScope)).toStrictEqual([1, 2, 3]);

    const expression1 = parse("length(array(1, 2, 3))");
    expect(evaluate(expression1, globalScope)).toBe(3);

    const expression2 = parse("element(array(1, 2, 3), 2)");
    expect(evaluate(expression2, globalScope)).toBe(3);

    run(`
    do(define(sum, fun(array,
         do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
              do(define(sum, +(sum, element(array, i))),
                 define(i, +(i, 1)))),
            sum))),
       print(sum(array(1, 2, 3))))
    `);
    expect(console.log).toHaveBeenLastCalledWith(6);
});

test("skip comments", () => {
    console.log(parse("# hello\nx"));
    expect(console.log).toHaveBeenCalledWith({ type: "word", name: "x" });

    console.log(parse("a # one\n   # two\n()"));
    expect(console.log).toHaveBeenCalledWith({ type: "apply", operator: { type: "word", name: "a" }, args: [] });
});

test("closure", () => {
    expect(
        run(`
            do(define(f, fun(a, fun(b, +(a, b)))),
            print(f(4)(5)))
            `)
    ).toBe(9);
});

test("set", () => {
    run(`
    do(define(x, 4),
        define(setx, fun(val, set(x, val))),
            setx(50),
            print(x))
    `);
    expect(console.log).toHaveBeenCalledWith(50);

    expect(() => {
        run(`set(quux, true)`);
    }).toThrowError(ReferenceError);
});
