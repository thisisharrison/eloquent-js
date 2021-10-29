import dominantDirection from "./05-04";
import { SCRIPTS } from "./05-scripts-data";

test("dominantDirection", () => {
    expect(dominantDirection("Hello!", SCRIPTS)).toBe("ltr");
    expect(dominantDirection("Hey, مساء الخير", SCRIPTS)).toBe("rtl");
});
