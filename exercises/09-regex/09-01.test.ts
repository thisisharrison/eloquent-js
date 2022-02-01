test("car and cat", () => {
    // const regex = /(car|cat)/i;
    const regex = /c(at|ar)/i;
    const yes = ["my car", "bad cats"];
    const no = ["camper", "high art"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("pop and prop", () => {
    const regex = /(pr?op)/i;
    const yes = ["pop culture", "mad props"];
    const no = ["plop", "prrrop"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("ferret, ferry, and ferrari", () => {
    const regex = /ferr(et|y|ari)/;
    const yes = ["ferret", "ferry", "ferrari"];
    const no = ["ferrum", "transfer A"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("Any word ending in ious", () => {
    const regex = /ious\b/;
    const yes = ["how delicious", "spacious room"];
    const no = ["ruinous", "consciousness"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("A whitespace character followed by a period, comma, colon, or semicolon", () => {
    const regex = /\s+[.|,|;]/;
    const yes = ["bad punctuation ."];
    const no = ["escape the period"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("A word longer than six letters", () => {
    const regex = /\w{7}/;
    const yes = ["Siebentausenddreihundertzweiundzwanzig"];
    const no = ["no", "three small words"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});

test("A word without the letter e (or E)", () => {
    // \W: An alphanumeric character (“word character”)
    const regex = /\b[^\We]+\b/i;
    const yes = ["red platypus", "wobbling nest"];
    const no = ["earth bed", "learning ape", "BEET"];
    for (const string of yes) {
        expect(string).toMatch(regex);
    }
    for (const string of no) {
        expect(string).not.toMatch(regex);
    }
});
