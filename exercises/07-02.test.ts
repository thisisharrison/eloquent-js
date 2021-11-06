import { compareRobots } from "./07-01";
import { goalOrientedRobot } from "./07-robot";
import moreEfficientRobot from "./07-02";

test("moreEfficientRobot", () => {
    let results = compareRobots(goalOrientedRobot, [], moreEfficientRobot, []);
    expect(results[0]).toBeGreaterThan(results[1]);
});
