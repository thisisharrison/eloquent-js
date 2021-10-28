export function deepEqual(o1: Record<string, any>, o2: Record<string, any>): boolean {
    if (o1 === o2) return true;

    if (o1 === null || typeof o1 !== "object" || o2 === null || typeof o2 !== "object") return false;
    let k1 = Object.keys(o1);
    let k2 = Object.keys(o2);
    if (k1.length !== k2.length) return false;
    for (let key of k1) {
        if (!(key in o2) || !deepEqual(o1[key], o2[key])) return false;
    }
    return true;
}
