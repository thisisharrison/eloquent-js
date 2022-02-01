import { Vec } from "./vec";
import { levelChars } from "./shared";

export type Plan = string;

export class Level {
    height: number;
    width: number;
    starActors: any[];
    rows: string[][];

    constructor(plan: Plan) {
        // prettier-ignore
        let rows = plan.trim().split("\n").map(line => [...line]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.starActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((col, x) => {
                let type = levelChars[col];
                if (typeof type === "string") {
                    return type;
                }
                // call constructor of start actor class
                this.starActors.push(type.create(new Vec(x, y), col));
                return "empty";
            });
        });
    }

    touches(pos: Vec, size: Vec, type: "wall" | "coin" | "lava") {
        // computes surrounding set of grid squares that body overlaps
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
                const here = isOutside ? "wall" : this.rows[y][x];
                if (here === type) return true;
            }
        }
        return false;
    }
}
