import type { Level } from "./level";
import { overlap } from "./shared";

// persistent structure
// update game state keeps the old one intact
export class State {
    level: Level;
    actors: any[];
    status: "lost" | "won" | "playing";

    static start(level: Level) {
        return new State(level, level.starActors, "playing");
    }

    constructor(level: Level, actors: any[], status: "lost" | "won" | "playing") {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    get player() {
        return this.actors.find((a) => a.type === "player");
    }

    update(time: number, keys: any) {
        const actors = this.actors.map((actor) => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status);

        if (newState.status !== "playing") return newState;

        const player = newState.player;
        // game over
        if (this.level.touches(player.pos, player.size, "lava")) {
            return new State(this.level, actors, "lost");
        }
        for (const actor of actors) {
            if (actor !== player && overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }
        return newState;
    }
}
