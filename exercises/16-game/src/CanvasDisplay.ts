import { Coin } from "./coin";
import { Lava } from "./lava";
import { Level } from "./level";
import { Player } from "./player";
import { flipHorizontally, playerXOverlap, SCALE } from "./shared";
import { State } from "./state";

class CanvasDisplay {
    canvas: HTMLCanvasElement;
    cx: CanvasRenderingContext2D | null;
    flipPlayer: boolean;
    viewport: { left: number; top: number; width: number; height: number };
    sprites: HTMLImageElement;
    playerSprite: HTMLImageElement;

    constructor(parent: HTMLElement, level: Level) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.min(600, level.width * SCALE);
        this.canvas.height = Math.min(600, level.height * SCALE);
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");

        this.flipPlayer = false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / SCALE,
            height: this.canvas.height / SCALE,
        };

        this.sprites = document.createElement("img");
        this.sprites.src = require("./img/sprites.png");

        this.playerSprite = document.createElement("img");
        this.playerSprite.src = require("./img/player.png");
    }

    clear() {
        this.canvas.remove();
    }

    syncState(state: State) {
        this.updateViewport(state);
        this.clearDisplay(state.status);
        this.drawBackground(state.level);
        this.drawActors(state.actors);
    }

    updateViewport(state: State) {
        const view = this.viewport;
        const margin = view.width / 3;
        const player = state.player;
        const center = player.pos.plus(player.size.times(0.5));

        if (center.x < view.left + margin) {
            view.left = Math.max(center.x - margin, 0);
        } else if (center.x > view.left + view.width - margin) {
            view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
        }

        if (center.y < view.top + margin) {
            view.top = Math.max(center.y - margin, 0);
        } else if (center.y > view.top + view.height - margin) {
            view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
        }
    }

    clearDisplay(status: "lost" | "won" | "playing") {
        if (!this.cx) return;
        if (status == "won") {
            this.cx.fillStyle = "rgb(68, 191, 255)";
        } else if (status == "lost") {
            this.cx.fillStyle = "rgb(44, 136, 214)";
        } else {
            this.cx.fillStyle = "rgb(52, 166, 251)";
        }
        this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground(level: Level) {
        if (!this.cx) return;
        let { left, top, width, height } = this.viewport;
        let xStart = Math.floor(left);
        let xEnd = Math.ceil(left + width);
        let yStart = Math.floor(top);
        let yEnd = Math.ceil(top + height);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let tile = level.rows[y][x];
                if (tile == "empty") continue;
                let screenX = (x - left) * SCALE;
                let screenY = (y - top) * SCALE;
                let tileX = tile == "lava" ? SCALE : 0;
                this.cx.drawImage(this.sprites, tileX, 0, SCALE, SCALE, screenX, screenY, SCALE, SCALE);
            }
        }
    }

    drawPlayer(player: Player, x: number, y: number, width: number, height: number) {
        if (!this.cx) return;

        width += playerXOverlap * 2;
        x -= playerXOverlap;
        if (player.speed.x != 0) {
            this.flipPlayer = player.speed.x < 0;
        }

        let tile = 8;
        if (player.speed.y != 0) {
            tile = 9;
        } else if (player.speed.x != 0) {
            tile = Math.floor(Date.now() / 60) % 8;
        }

        this.cx.save();
        if (this.flipPlayer) {
            flipHorizontally(this.cx, x + width / 2);
        }
        let tileX = tile * width;
        this.cx.drawImage(this.playerSprite, tileX, 0, width, height, x, y, width, height);
        this.cx.restore();
    }

    drawActors(actors: (Player | Coin | Lava)[]) {
        if (!this.cx) return;
        for (let actor of actors) {
            let width = actor.size.x * SCALE;
            let height = actor.size.y * SCALE;
            let x = (actor.pos.x - this.viewport.left) * SCALE;
            let y = (actor.pos.y - this.viewport.top) * SCALE;
            if (actor.type == "player") {
                this.drawPlayer(actor as Player, x, y, width, height);
            } else {
                // Lava tile is offset 20, Coin is 40, ie. 2 times
                let tileX = (actor.type == "coin" ? 2 : 1) * SCALE;
                this.cx.drawImage(this.sprites, tileX, 0, width, height, x, y, width, height);
            }
        }
    }
}

export default CanvasDisplay;
