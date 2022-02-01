import { State } from "./state";
import { Vec } from "./vec";

export class Lava {
    pos: Vec;
    speed: Vec;
    // dripping resets to start;
    // no reset means bouncing and inverting direction
    reset?: Vec;

    static create(pos: Vec, ch: string) {
        // moves back and forth
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
            // move vertically
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
            // dripping
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }

    size: Vec = new Vec(1, 1);

    constructor(pos: Vec, speed: Vec, reset?: Vec) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() {
        return "lava";
    }

    collide(state: State) {
        return new State(state.level, state.actors, "lost");
    }

    update(time: number, state: State) {
        const newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Lava(newPos, this.speed, this.reset);
        } else if (this.reset) {
            // dripping lava
            return new Lava(this.reset, this.speed, this.reset);
        } else {
            // bouncing lava
            return new Lava(this.pos, this.speed.times(-1));
        }
    }
}
