import { Vec } from "./vec";
import { State } from "./state";

const MONSTERXSPEED = 4;

export class Monster {
    pos: Vec;
    dir: number;

    static create(pos: Vec) {
        return new Monster(pos.plus(new Vec(0, -1)));
    }

    size: Vec = new Vec(1.2, 2);

    constructor(pos: Vec) {
        this.pos = pos;
        this.dir = -1;
    }

    get type() {
        return "monster";
    }

    update(time: number, state: State) {
        let player = state.player;
        let speed = (player.pos.x < this.pos.x ? -1 : 1) * time * MONSTERXSPEED;
        let newPos = new Vec(this.pos.x + speed, this.pos.y);
        // TODO: invert direction when Monster hits wall or another Monster, doesn't fall into Lava, doesn't overlap another monster
        if (state.level.touches(newPos, this.size, "wall")) return this;
        else return new Monster(newPos);
    }

    collide(state: State) {
        let player = state.player;
        // player above monster?
        if (player.pos.y + player.size.y < this.pos.y + 0.5) {
            let filtered = state.actors.filter((a) => a !== this);
            return new State(state.level, filtered, state.status);
        } else {
            // player killed by monster
            return new State(state.level, state.actors, "lost");
        }
    }
}
