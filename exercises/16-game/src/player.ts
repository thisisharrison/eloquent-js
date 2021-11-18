import { Vec } from "./vec";
import { State } from "./state";

const PLAYERXSPEED = 7;
const GRAVITY = 30;
const JUMPSPEED = 17;

export class Player {
    pos: Vec;
    speed: Vec;

    static create(pos: Vec) {
        return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }

    size: Vec = new Vec(0.8, 1.5);

    constructor(pos: Vec, speed: Vec) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "player";
    }

    update(time: number, state: State, keys: any) {
        let xSpeed = 0;
        if (keys.ArrowLeft) {
            xSpeed -= PLAYERXSPEED;
        } else if (keys.ArrowRight) {
            xSpeed += PLAYERXSPEED;
        }
        let pos = this.pos;
        let movedX = pos.plus(new Vec(xSpeed * time, 0));
        const xNotWall = !state.level.touches(movedX, this.size, "wall");
        if (xNotWall) {
            pos = movedX;
        }

        let ySpeed = this.speed.y + time * GRAVITY;
        let movedY = pos.plus(new Vec(0, ySpeed * time));
        const yNotWall = !state.level.touches(movedY, this.size, "wall");
        if (yNotWall) {
            pos = movedY;
        } else if (keys.ArrowUp && ySpeed > 0) {
            ySpeed -= JUMPSPEED;
        } else {
            ySpeed = 0;
        }

        return new Player(pos, new Vec(xSpeed, ySpeed));
    }
}
