import PGroup from "./07-03";

test("PGroup", () => {
    let a = PGroup.empty.add("a");
    let ab = a.add("b");
    let b = ab.delete("a");

    expect(b.has("b")).toBeTruthy();
    expect(a.has("b")).toBeFalsy();
    expect(b.has("a")).toBeFalsy();
});
