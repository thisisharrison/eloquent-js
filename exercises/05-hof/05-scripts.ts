type Range = [from: number, to: number];

export type Script = {
    name: string;
    ranges: Range[];
    direction: "rtl" | "ltr" | "ttb";
    year: number;
    living: boolean;
    link: string;
};

/**
 * Find the scripts with most characters
 * {
 *  name: "Hanunoo",
 *  ranges: [[5920, 5941]],
 *  ...
 * Characters count would be 5941 - 5920 (to - from)
 */
export function characterCount(scripts: Script[]) {
    // reduces the ranges by summing their sizes
    function count(script: Script) {
        return script.ranges.reduce((count: number, [from, to]: Range) => {
            return (count += to - from);
        }, 0);
    }
    // find the largest script by repeatedly comparing two scripts and returning the larger one
    return scripts.reduce((prevScript, curScript) => {
        return count(curScript) > count(prevScript) ? curScript : prevScript;
    });
}

/**
 * Find the average year of origin of living and dead scripts
 */
function average(array: number[]) {
    return array.reduce((a, b) => a + b) / array.length;
}
export function averageOrigin(living: boolean, scripts: Script[]) {
    return Math.round(average(scripts.filter((s) => s.living === living).map((_) => _.year)));
}

/**
 * Find the corresponding script given some text
 */
export function findCharacterScript(code: number, scripts: Script[]) {
    for (const script of scripts) {
        if (
            script.ranges.some(([from, to]) => {
                return code >= from && code <= to;
            })
        ) {
            return script;
        }
    }
    return null;
}

interface Count<U> {
    name: U;
    count: number;
}
/**
 * The countBy function expects a collection (anything that we can loop over with for/of)
 * and a function that computes a group name for a given element.
 * It returns an array of objects, each of which names a group
 * and tells you the number of elements that were found in that group
 */
export function countBy<T, U>(iterable: Iterable<T>, groupBy: (element: T) => U): Count<U>[] {
    let result: Count<U>[] = [];
    for (const item of iterable) {
        let key = groupBy(item);
        let idx = result.findIndex((group) => group.name === key);
        if (idx === -1) {
            result.push({ name: key, count: 1 });
        } else {
            result[idx].count += 1;
        }
    }
    return result;
}

/**
 * Counts the scripts
 */
export function textScripts(string: string, scripts: Script[]): string {
    let scriptCount = countBy(string, (char) => {
        let script = findCharacterScript(char.charCodeAt(0), scripts);
        return script ? script.name : "none";
    }).filter((_) => _.name !== "none");

    const total = scriptCount.reduce((total, count) => total + count.count, 0);

    return scriptCount.map(({ count, name }) => `${Math.round((100 * count) / total)}% ${name}`).join(", ");
}
