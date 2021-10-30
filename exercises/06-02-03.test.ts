import Group from "./06-02-03";

test("Group", () => {
    let group = Group.from([10, 20]);
    expect(group.has(10)).toBeTruthy();
    // → true
    expect(group.has(30)).toBeFalsy();
    // → false
    group.add(10);
    group.delete(10);
    expect(group.has(10)).toBeFalsy();
    // → false
});

test("GroupIterator", () => {
    let test = [];
    for (let value of Group.from(["a", "b", "c"])) {
        test.push(value);
    }
    expect(test).toEqual(["a", "b", "c"]);
});
