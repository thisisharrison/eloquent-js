import { VillageState } from "./07-village";
import { buildGraph, mailRoute, ROADS } from "./07-graph";
import type { Place } from "./07-graph";

export function randomPick<T>(array: T[]) {
    let idx = Math.floor(Math.random() * array.length);
    return array[idx];
}

// random method
export function randomRobot(village: VillageState) {
    let connectedPaths = village.graph[village.robotPosition];
    let direction = randomPick(connectedPaths);
    return { direction };
}

// mail method: queue serves FIFO, and pop each location off to go next
export function routeRobot(_: VillageState, queue: string[]) {
    if (queue.length === 0) {
        queue = mailRoute;
    }
    let nextPlace = queue[0];
    // next location, and remove first location from memory
    return { direction: nextPlace, memory: queue.slice(1) };
}

// path finding
interface Path {
    at: string;
    route: string[];
}
export function findRoute(from: string, to: string, graph = buildGraph(ROADS)) {
    // use a queue to traverse a graph
    let queue: Path[] = [{ at: from, route: [] }];
    // memoize all the places we added to `at`
    let memo = new Set(from);
    for (let i = 0; i < queue.length; i++) {
        // pop the first item
        let { at, route } = queue[i];
        // look up the possible places to go from `at` in graph
        for (let place of graph[at]) {
            // matches to where we're going
            if (place === to) {
                return route.concat(place);
            }
            if (!memo.has(place)) {
                queue.push({ at: place, route: route.concat(place) });
                memo.add(place);
            }
        }
    }
}

// TODO: review
export function goalOrientedRobot(village: VillageState, route: string[]) {
    let { parcels, robotPosition } = village;
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== robotPosition) {
            // @ts-ignore
            route = findRoute(robotPosition, parcel.place);
        } else {
            // @ts-ignore -- why should address work as well?
            route = findRoute(robotPosition, parcel.address);
        }
    }
    console.log(route);
    return { direction: route[0], memory: route.slice(1) };
}

interface Action {
    direction: string;
    memory: string[];
}

export type Robot = (state: VillageState, memory: string[]) => Action;

export function runRobot(village: VillageState, robot: Robot, memory: string[] = []) {
    let statement = "";
    for (let turn = 0; ; turn++) {
        if (village.parcels.length === 0) {
            statement = `Done in ${turn} turns`;
            // console.log(statement);
            break;
        }
        let action: Action = robot(village, memory);
        village = village.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
    return statement;
}
