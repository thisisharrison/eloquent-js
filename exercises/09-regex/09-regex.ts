// Invert a set
export const invertBinary = /[^01]/;

// Repeating
export const moreThanOneDigit = /'\d+'/;
export const zeroOrMoreDigit = /'\d*'/;

// Optional
export const optionalU = /neighbou?r/;

// Range
export const dateTimeWithRange = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;

// Group Subexpression
// boo(and more os) ... hoo(and more os) ... (hoo) and more hoos
export const crying = /boo+(hoo+)+/i;

// Using exec
// Using match
// See test

// match the 'quote' and group by omitting the ''
export const quotedText = /'([^']*)'/;

export function getDate(string: string) {
    // starts and ends in this expression
    // @ts-ignore
    let [_, month, day, year] = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(string);
    return new Date(year, month - 1, day);
}

// Using replace and /g
// Using $1 to refer matched groups
// See test

// first argument will be the match
export function minusOne(_: any, digit: string, fruit: string) {
    let amount = Number(digit) - 1;
    if (amount === 1) {
        // remove "s"
        fruit = fruit.slice(0, fruit.length - 1);
    } else if (amount === 0) {
        return `no ${fruit}`;
    }
    return `${amount} ${fruit}`;
}

// non-greedy by putting question mark after repetition operators (+, *, ?, {})
export function stripComments(code: string) {
    // "\/\/.*" for //
    // "\/\*[^]*?\*\/" for /** */ and [^] stands for any character that is not in the empty set of characters, even those that continue on a new line
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

// using loops
export function loopOverMatch(regex: RegExp, input: string) {
    let match = undefined;
    let result = [];
    // match at the start of iteration and saves result in a binding
    // stops when no matches are found
    // use exec to make use of lastIndex
    while ((match = regex.exec(input))) {
        result.push(match[0]);
    }
    return result;
}

// parse INI file
// TODO: attempt this example with YAML
export function parseINI(string: string) {
    // Start with an object to hold the top-level fields
    let result: { [key: string]: string } = {};
    let section = result;
    string.split(/\r?\n/).forEach((line) => {
        let match;
        // assign result of match to a binding and use it if predicate is true
        // any word = ...
        if ((match = line.match(/^(\w+)=(.*)$/))) {
            section[match[1]] = match[2];
            // add [word]
        } else if ((match = line.match(/^\[(.*)\]$/))) {
            // @ts-ignore
            section = result[match[1]] = {};
            // any comment (;) or empty line (?).
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error("Line '" + line + "' is not valid.");
        }
    });
    return result;
}
