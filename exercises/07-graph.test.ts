import { buildGraph, ROADS } from "./07-graph";

test("buildGraph", () => {
    let graph = buildGraph(ROADS);
    expect(graph["Alice's House"]).toEqual(expect.arrayContaining(["Bob's House", "Cabin", "Post Office"]));
    expect(graph["Cabin"]).toEqual(expect.arrayContaining(["Alice's House"]));
});
