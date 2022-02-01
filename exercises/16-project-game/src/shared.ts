import { Player } from "./player";
import { Coin } from "./coin";
import { Lava } from "./lava";
import type { Level } from "./level";
import { Monster } from "./monster";

export function overlap(actor1: Lava | Coin, actor2: Lava | Coin) {
    // any point + size are overlapped
    // prettier-ignore
    return actor1.pos.x + actor1.size.x > actor2.pos.x && 
    actor1.pos.x < actor2.pos.x + actor2.size.x && 
    actor1.pos.y + actor1.size.y > actor2.pos.y && 
    actor1.pos.y < actor2.pos.y + actor2.size.y;
}

export const levelChars: Record<string, any> = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    M: Monster,
    o: Coin,
    "=": Lava,
    "|": Lava,
    v: Lava,
};

// helper function to create elements add attr and children
export function elt(name: keyof HTMLElementTagNameMap, attrs: Record<string, string>, ...children: ChildNode[]) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

export const SCALE = 20;

export function drawGrid(level: Level): ChildNode {
    return elt(
        "table",
        {
            class: "background",
            style: `width: ${level.width * SCALE}px`,
        },
        ...level.rows.map((row) => elt("tr", { style: `height: ${SCALE}px` }, ...row.map((type) => elt("td", { class: type }))))
    );
}

export function drawActors(actors: (Player | Coin | Lava)[]) {
    return elt(
        "div",
        {},
        ...actors.map((actor) => {
            let rect = elt("div", { class: `actor ${actor.type}` });
            rect.style.width = `${actor.size.x * SCALE}px`;
            rect.style.height = `${actor.size.y * SCALE}px`;
            rect.style.left = `${actor.pos.x * SCALE}px`;
            rect.style.top = `${actor.pos.y * SCALE}px`;
            return rect;
        })
    );
}

const KEYS: string[] = ["ArrowLeft", "ArrowRight", "ArrowUp"];

interface TrackKeys {
    ArrowLeft: boolean;
    ArrowRight: boolean;
    ArrowUp: boolean;
    unregister: () => void;
}

function trackKeys(keys: string[]): TrackKeys {
    let down = Object.create(null);
    function handler(event: KeyboardEvent) {
        if (keys.includes(event.key)) {
            // keydown = true, keyup = false
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", handler);

    // add a function to this object for window to unregister these event handlers
    down.unregister = () => {
        window.removeEventListener("keydown", handler);
        window.removeEventListener("keyup", handler);
    };

    return down;
}

export const arrowKeys = trackKeys(KEYS);

export const playerXOverlap = 4;

export function flipHorizontally(context: CanvasRenderingContext2D | null, center: number) {
    if (!context) return;
    // translate to the right
    context.translate(center, 0);
    // flip to the other side (but wrong position)
    context.scale(-1, 1);
    // restore position
    context.translate(-center, 0);
}
