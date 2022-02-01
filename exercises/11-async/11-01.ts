// @ts-nocheck

import { anyStorage } from "./11-crow-async";
import { Node } from "./11-crow-tech";

// TODO: redo

export async function locateScalpel(nest: Node) {
    let current = nest.name;
    for (;;) {
        let next = await anyStorage(nest, current, "scalpel");
        if (next === current) return current;
        current = next;
    }
}

export function locateScalpel2(nest: Node) {
    function loop(current) {
        return anyStorage(nest, current, "scalpel").then((next) => {
            if (next === current) return current;
            else return loop(next);
        });
    }
    return loop(nest.name);
}
