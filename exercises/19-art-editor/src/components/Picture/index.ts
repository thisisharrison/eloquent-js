import { Pixel } from "../../types";

export default class Picture {
    width: number;
    height: number;
    pixels: string[];

    constructor(width: number, height: number, pixels: string[]) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }

    static empty(width: number, height: number, colour: string) {
        const pixels = new Array(width * height).fill(colour);
        return new Picture(width, height, pixels);
    }

    pixel(x: number, y: number) {
        return this.pixels[x + y * this.width];
    }

    draw(input: Pixel[]) {
        let update = this.pixels.slice();
        for (let { x, y, colour } of input) {
            update[x + y * this.width] = colour;
        }
        return new Picture(this.width, this.height, update);
    }
}
