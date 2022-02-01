// Build graph from 07-graph-data
export const ROADS = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall",
];

export const mailRoute = [
    "Alice's House",
    "Cabin",
    "Alice's House",
    "Bob's House",
    "Town Hall",
    "Daria's House",
    "Ernie's House",
    "Grete's House",
    "Shop",
    "Grete's House",
    "Farm",
    "Marketplace",
    "Post Office",
]; // as const

export type Place = typeof mailRoute[number];

export interface Graph {
    [K: string]: string[];
}
export function buildGraph(edges = ROADS) {
    let graph: Graph = Object.create(null);
    function addEdge(from: string, to: string) {
        if (from in graph) {
            graph[from].push(to);
        } else {
            graph[from] = [to];
        }
    }
    for (const [from, to] of edges.map((e) => e.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
