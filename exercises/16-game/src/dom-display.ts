import type { Level } from "./level";
import { drawActors, drawGrid, SCALE } from "./shared";
import { elt } from "./shared";
import { State } from "./state";

export class DOMDisplay {
    dom: HTMLElement;
    actorLayer: any;

    constructor(parent: HTMLElement, level: Level) {
        this.dom = elt("div", { class: "game" }, drawGrid(level));
        // track elements that hold actors so they can be easily removed or replaced
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() {
        this.dom.remove();
    }

    syncState(state: State) {
        if (this.actorLayer) {
            this.actorLayer.remove();
        }
        this.actorLayer = drawActors(state.actors);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state: State) {
        const width = this.dom.clientWidth;
        const height = this.dom.clientHeight;
        const margin = width / 3;

        const left = this.dom.scrollLeft;
        const right = left + width;
        const top = this.dom.scrollTop;
        const bottom = top + height;

        const { player } = state;
        // player's relative center
        const center = player.pos.plus(player.size.times(0.5)).times(SCALE);

        // setting scrollLeft to -10 will cause it to become 0
        if (center.x < left + margin) {
            this.dom.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.dom.scrollLeft = center.x + margin - width;
        }
        if (center.y < top + margin) {
            this.dom.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.dom.scrollTop = center.y + margin - height;
        }
    }
}
