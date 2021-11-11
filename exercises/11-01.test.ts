import { bigOak } from "./11-crow-tech";
import { locateScalpel, locateScalpel2 } from "./11-01";

test("localScalpel", () => {
    expect(locateScalpel(bigOak)).resolves.toBe("Butcher Shop");
    expect(locateScalpel2(bigOak)).resolves.toBe("Butcher Shop");
});
