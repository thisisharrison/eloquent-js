// prettier-ignore
const program = 
`do(define(x, 10),
    if(>(x, 5),
        print("large"),
        print("small")))`

/** Building Syntax Tree */

// cuts whitespace
function skipSpace(string: string) {
    // const first = string.search(/\S/);
    // if (first === -1) return "";
    // return string.slice(first);

    // any whitespace character \s or starting with # combined with any character .*
    let skippable = string.match(/^(\s|#.*)*/);
    if (!skippable) return "";
    return string.slice(skippable[0].length);
}

interface Value {
    type: "value";
    value: string | number;
}
interface Word {
    type: "word";
    name: string;
}
interface Apply {
    type: "apply";
    operator: Expr;
    args: any[];
}
type Expr = Value | Word | Apply;

// parse program expression into syntax tree
function parseExpression(program: string) {
    program = skipSpace(program);
    let match: RegExpMatchArray | null, expr: Expr | null;
    if ((match = /^"([^"]*)"/.exec(program))) {
        // strings
        expr = { type: "value", value: match[1] };
    } else if ((match = /^\d+\b/.exec(program))) {
        // numbers
        expr = { type: "value", value: Number(match[0]) };
    } else if ((match = /^[^\s(),#"]+/.exec(program))) {
        // words: do, define, >, fun
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    // ">(x, 5)" -> parseApply(">", "(x, 5)")
    return parseApply(expr, program.slice(match[0].length));
}

interface Parsed {
    expr: Expr;
    rest: string;
}

function parseApply(expr: Expr, program: string): Parsed {
    program = skipSpace(program);
    if (program[0] !== "(") {
        return { expr, rest: program };
    }
    // skipped the "("
    program = skipSpace(program.slice(1));
    expr = { type: "apply", operator: expr, args: [] };
    while (program[0] !== ")") {
        // recursive call to parse arguments until closing ")" is found
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);

        if (program[0] === ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] !== ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }

    return parseApply(expr, program.slice(1));
}

export function parse(program: string) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

/** Evaluating syntax tree */
interface Scope {
    [variable: string]: any;
}
// associate special syntax/words with functions
const specialForms: Scope = Object.create(null);
export const globalScope: Scope = Object.create(null);

// Add arithmetic and comparison operands, use Function to evaluate them
for (const op of ["+", "-", "*", "/", "==", "===", "<", ">"]) {
    globalScope[op] = Function("a, b", `return a ${op} b;`);
}
// Add print (console.log) to globalScope
globalScope.print = (value: any) => {
    console.log(value);
    return value;
};

/** 12.01 - array */
globalScope.array = (...values: any[]) => {
    return values;
};

globalScope.length = (array: any[]) => array.length;

globalScope.element = (array: any[], index: number) => array[index];

specialForms.if = (args: Expr[], scope: Scope) => {
    if (args.length !== 3) {
        throw new SyntaxError("Wrong number of args to if");
    }
    const predicate = evaluate(args[0], scope);
    // exclude 0, "", undefined, null falsey values
    if (predicate !== false) {
        // shouldn't evaluate args[2] if predicate is true
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args: Expr[], scope: Scope) => {
    if (args.length !== 2) {
        throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }
    // doesn't return undefined like JS
    return false;
};

// executes all its arguments from top to bottom
specialForms.do = (args: Expr[], scope: Scope) => {
    let returnValue = false;
    for (let arg of args) {
        returnValue = evaluate(arg, scope);
    }
    return returnValue;
};

// create bindings and give them new values, like const in JS, val in Scala, set! in Lisp
/**
 * define(x, 5) -> assign x to 5
 * {
 * type: "apply",
 * operator: {type: "word", name: "define"}
 * args: [
 * {type: "word", name: "x"},
 * {type: "word", value: 5},
 * ]
 * }
 */
specialForms.define = (args: Expr[], scope: Scope) => {
    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

/** 12.04 - SET */
// Update binding of outer scope if it doesn't already exist in the inner scope
specialForms.set = (args: Expr[], env: Scope) => {
    console.log(`@@@SET`, JSON.stringify(env));
    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Bad use of set");
    }
    let variableName = args[0].name;
    let value = evaluate(args[1], env);

    // traverse to outer scopes
    // getPrototypeOf most outer scope returns null so we did not find the binding
    for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
        console.log(`@@@SET FOR-LOOP`, JSON.stringify(scope));
        // if variable name exists in current scope
        if (Object.prototype.hasOwnProperty.call(scope, variableName)) {
            scope[variableName] = value;
            return value;
        }
    }
    throw new ReferenceError(`Setting undefined variable ${variableName}`);
};

// functions
/**
 * fun(a, +(a, 1)) -> function(a) { return a + 1}
 */
specialForms.fun = (args: Expr[], scope: Scope) => {
    console.log("@@@TOP ", JSON.stringify(scope));
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map((expr) => {
        if (expr.type !== "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function () {
        if (arguments.length !== params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        // add argument bindings to localScope
        // this allows closure
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        console.log("@@@LOCAL ", JSON.stringify(localScope));
        return evaluate(body, localScope);
    };
};

export function evaluate(expr: Expr, scope: Scope): any {
    if (expr.type === "value") {
        // if expression is 100, return 100
        return expr.value;
    } else if (expr.type === "word") {
        if (expr.name && expr.name in scope) {
            // fetch binding's value
            return scope[expr.name!];
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    } else if (expr.type === "apply") {
        let { operator, args } = expr;
        // specialForms like `if`
        if (operator.type === "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op: Function = evaluate(operator, scope);
            if (typeof op === "function") {
                return op(...args.map((arg) => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function");
            }
        }
    }
}

// run program with a fresh scope
export function run(program: string) {
    return evaluate(parse(program), Object.create(globalScope));
}
