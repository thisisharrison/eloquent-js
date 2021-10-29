import { countBy, findCharacterScript } from "./05-scripts";
import type { Script } from "./05-scripts";

// TODO: better type
/**
 * Count charCode for example {name: "rtl", count: 1}
 * Return the largest count by name
 */
export default function dominantDirection(string: string, scripts: Script[]): Script["direction"] {
    let dirCount = countBy(string, (s) => {
        let code = s.charCodeAt(0);
        let script = findCharacterScript(code, scripts);
        return script ? script.direction : "none";
    }).filter(({ name }) => name !== "none");

    // @ts-ignore -- filtered "none" above
    return dirCount.reduce((prev, cur) => (prev.count > cur.count ? prev : cur)).name;
}
