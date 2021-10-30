export default class Vec {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    plus(vector: Vec) {
        return new Vec(vector.x + this.x, vector.y + this.y);
    }

    minus(vector: Vec) {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }
}
