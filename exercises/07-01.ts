import { VillageState } from "./07-village";
import type { Robot } from "./07-robot";

export function compareRobots(r1: Robot, m1: string[], r2: Robot, m2: string[]) {
    function runRobot(village: VillageState, robot: Robot, memory: string[]) {
        for (let count = 0; ; count++) {
            if (village.jobFinished) return count;
            let action = robot(village, memory);
            village = village.move(action.direction);
            memory = action.memory;
        }
    }
    let result1 = 0;
    let result2 = 0;
    for (let tasks = 0; tasks < 100; tasks++) {
        let test = VillageState.initializeVillage();
        result1 += runRobot(test, r1, m1);
        result2 += runRobot(test, r2, m2);
    }
    return [result1 / 100, result2 / 100];
}
