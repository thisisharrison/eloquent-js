export class Vec {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(other: Vec) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    times(factor: number) {
        return new Vec(this.x * factor, this.y * factor);
    }
}
