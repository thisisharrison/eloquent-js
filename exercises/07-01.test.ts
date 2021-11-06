import { compareRobots } from "./07-01";
import { mailRoute } from "./07-graph";
import { routeRobot, goalOrientedRobot } from "./07-robot";

test("compareRobots", () => {
    let results = compareRobots(routeRobot, mailRoute, goalOrientedRobot, []);
    expect(results[0]).toBeGreaterThan(results[1]);
});
