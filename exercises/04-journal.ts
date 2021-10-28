import { JOURNAL } from "./04-journal-data";

/**
 * Read journal for specific activity and organize into a table:
 * Using binary numbers to get to array's indices
 *      [n00,       n01,        n10,        n11]
 * eg.  [no S no P, no S yes P, yes S no P, yes S yes P]
 */
export function tableFor(event: string, journal = JOURNAL) {
    let result = [0, 0, 0, 0];
    for (let entry of journal) {
        let index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2; // result in 2 or 3 (yes S)
        // update occurrence in result
        result[index] += 1;
    }
    return result;
}

// Calculate phi (correlation)
export function phi([n00, n01, n10, n11]: number[]) {
    return (n11 * n00 - n10 * n01) / Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
}

// Find the correlation of peanut and did not brushed teeth combined
export function peanutTeeth() {
    let clone: typeof JOURNAL = Object.assign([], JOURNAL);
    for (let entry of clone) {
        if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
            entry.events.push("peanut teeth");
        }
    }
    return phi(tableFor("peanut teeth", clone));
}
