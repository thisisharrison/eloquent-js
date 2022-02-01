import type Picture from "../Picture";
import { Utils } from "../../utils";
import { Callback } from "../../types";

const SCALE = 10;

export default class PictureCanvas {
    picture: Picture | null;
    dom: HTMLCanvasElement;

    constructor(picture: Picture, pointerDown: Callback) {
        this.dom = Utils.render("canvas", {
            onmousedown: (event: MouseEvent) => this.mouse(event, pointerDown),
            ontouchstart: (event: TouchEvent) => this.touch(event, pointerDown),
        });
        this.picture = null;
        this.syncState(picture);
    }

    syncState(picture: Picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        this.drawPicture(this.picture, this.dom, SCALE);
    }

    drawPicture(picture: Picture, canvas: HTMLCanvasElement, scale: number) {
        canvas.width = picture.width * scale;
        canvas.height = picture.height * scale;
        const cx = canvas.getContext("2d");
        if (!cx) return;

        for (let y = 0; y < picture.height; y++) {
            for (let x = 0; x < picture.width; x++) {
                // Gets the colour and fill it
                cx.fillStyle = picture.pixel(x, y);
                cx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }

    mouse(event: MouseEvent, onDown: Callback) {
        if (event.button !== 0) {
            return;
        }
        let pos = this.pointerPosition(event, this.dom);
        let onMove = onDown(pos);
        if (!onMove) {
            return;
        } else {
            const anotherCB = onMove;
            let move = (event: MouseEvent) => {
                if (event.buttons == 0) {
                    this.dom.removeEventListener("mousemove", move);
                } else {
                    let newPos = this.pointerPosition(event, this.dom);
                    if (newPos.x === pos.x && newPos.y === pos.y) {
                        return;
                    }
                    pos = newPos;
                    anotherCB(newPos);
                }
            };
            this.dom.addEventListener("mousemove", move);
        }
    }

    pointerPosition(event: MouseEvent | Touch, dom: HTMLCanvasElement) {
        const rect = dom.getBoundingClientRect();
        return { x: Math.floor((event.clientX - rect.left) / SCALE), y: Math.floor((event.clientY - rect.top) / SCALE) };
    }

    touch(event: TouchEvent, onDown: Callback) {
        // First touch object in touches give us coordinates (like clientX and clientY)
        let pos = this.pointerPosition(event.touches[0], this.dom);
        let onMove = onDown(pos);
        event.preventDefault();
        if (!onMove) {
            return;
        } else {
            const anotherCB = onMove;
            let move = (moveEvent: TouchEvent) => {
                let newPos = this.pointerPosition(moveEvent.touches[0], this.dom);
                if (newPos.x == pos.x && newPos.y == pos.y) return;
                pos = newPos;
                anotherCB(newPos);
            };
            let end = () => {
                this.dom.removeEventListener("touchmove", move);
                this.dom.removeEventListener("touchend", end);
            };
            this.dom.addEventListener("touchmove", move);
            this.dom.addEventListener("touchend", end);
        }
    }
}
