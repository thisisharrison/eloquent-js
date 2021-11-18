import { State } from "./state";
import { Vec } from "./vec";

const WOBBLESPEED = 8;
const WOBBLEDIST = 0.07;

export class Coin {
    pos: Vec;
    basePos: Vec;
    wobble: number;

    static create(pos: Vec) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        // random position in the wave,
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }

    constructor(pos: Vec, basePos: Vec, wobble: number) {
        this.pos = pos;
        this.basePos = basePos;
        // tracks the vertical back-and-forth motion
        this.wobble = wobble;
    }

    size = new Vec(0.6, 0.6);

    get type() {
        return "coin";
    }

    collide(state: State) {
        // filter out the coin and return new state
        const filtered = state.actors.filter((ch) => ch !== this);
        let status = state.status;
        // no coins left
        const isWon = !filtered.some((ch) => ch.type === "coin");
        if (isWon) {
            // update
            status = "won";
        }
        return new State(state.level, filtered, status);
    }

    update(time: number) {
        let wobble = this.wobble + time * WOBBLESPEED;
        // use Math.sin to find new position on the wave
        let wobblePos = Math.sin(wobble) * WOBBLEDIST;
        return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
    }
}
