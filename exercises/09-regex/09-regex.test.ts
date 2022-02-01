import { crying, dateTimeWithRange, getDate, invertBinary, loopOverMatch, minusOne, moreThanOneDigit, optionalU, parseINI, quotedText, stripComments, zeroOrMoreDigit } from "./09-regex";

test("invertBinary", () => {
    expect(invertBinary.test("1100100010100110")).toBeFalsy();
    expect(invertBinary.test("1100100010200110")).toBeTruthy();
});

test("moreThanOneDigit", () => {
    expect(moreThanOneDigit.test("'123'")).toBeTruthy();
    expect(moreThanOneDigit.test("''")).toBeFalsy();
    expect(zeroOrMoreDigit.test("'123'")).toBeTruthy();
    expect(zeroOrMoreDigit.test("''")).toBeTruthy();
});

test("optionalU", () => {
    expect(optionalU.test("neighbour")).toBeTruthy();
    expect(optionalU.test("neighbor")).toBeTruthy();
});

test("dateTimeWithRange", () => {
    expect(dateTimeWithRange.test("1-30-2003 8:45")).toBeTruthy();
    expect(dateTimeWithRange.test("01-3-2020 8:45")).toBeTruthy();
});

test("crying", () => {
    expect(crying.test("booBooooHoooohooooo")).toBeTruthy();
});

test("exec", () => {
    let result = /\d+/.exec("one two 100");
    // @ts-ignore
    expect(result[0]).toBe("100");
});

test("match", () => {
    let result = "one two 100".match(/\d+/);
    // @ts-ignore
    expect(result[0]).toBe("100");
});

test("quotedText", () => {
    // first the match 'quote' then the grouped text inside
    let result = quotedText.exec("she said 'hello'");
    expect(result?.slice(0, 2)).toEqual(["'hello'", "hello"]);
});

test("getDate", () => {
    let date = new Date(2021, 10, 7);
    let string = "11-7-2021";
    let result = getDate(string);
    expect(result).toEqual(date);
});

test("replace and g", () => {
    expect("papa".replace(/p/g, "m")).toBe("mama");
    expect("Borobudur".replace(/[ou]/g, "a")).toBe("Barabadar");
});

test("Using $ to refer matched groups", () => {
    let names = "Liskov, Barbara\nMcCarthy, John\nWadler, Philip";
    let reversed = names.replace(/(\w+), (\w+)/g, "$2 $1");
    expect(reversed).toBe("Barbara Liskov\nJohn McCarthy\nPhilip Wadler");
});

test("minusOne", () => {
    let fruits = "1 lemon, 2 apples, 3 melons";
    // @ts-ignore
    let results = fruits.replace(/(\d+) (\w+)/g, minusOne);
    expect(results).toBe("no lemon, 1 apple, 2 melons");
});

test("stripComments", () => {
    let comment = "hello/** remove me */ world";
    expect(stripComments(comment)).toBe("hello world");
});

test("loopOverMatch", () => {
    let input = "A string with 3 numbers in it... 42 and 88.";
    let number = /\b\d+\b/g;
    expect(loopOverMatch(number, input)).toEqual(["3", "42", "88"]);
});

test("parseINI", () => {
    expect(
        parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
    ).toEqual({ name: "Vasilis", address: { city: "Tessaloniki" } });
});
