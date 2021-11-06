import { VillageState } from "./07-village";
import { runRobot, randomRobot, routeRobot, goalOrientedRobot } from "./07-robot";

describe("randomRobot", () => {
    test("is random", () => {
        let v1 = VillageState.initializeVillage();
        let v2 = VillageState.initializeVillage();

        // @ts-ignore
        let r1 = runRobot(v1, randomRobot);
        // @ts-ignore
        let r2 = runRobot(v2, randomRobot);

        // expect(r1).toMatchInlineSnapshot(`"Done in 34 turns"`);
        // expect(r2).toMatchInlineSnapshot(`"Done in 73 turns"`);

        expect(r1).not.toBe(r2);
    });
});

describe("routeRobot", () => {
    test("twice the 13 step route", () => {
        let v1 = VillageState.initializeVillage();
        let r1 = runRobot(v1, routeRobot, []);
        let count = Number(r1.match(/(\d+)/g)![0]);
        expect(count).toBeLessThan(26);
    });
});

describe("goalOrientedRobot", () => {
    test("less than 16 turns", () => {
        let v1 = VillageState.initializeVillage();
        let r1 = runRobot(v1, goalOrientedRobot, []);
        let count = Number(r1.match(/(\d+)/g)![0]);
        expect(count).toBeLessThan(16);
    });
});
