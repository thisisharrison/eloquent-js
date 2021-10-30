export default class Temperature {
    celsius: number;

    constructor(celsius: number) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value: number) {
        this.celsius = (value - 32) / 1.8;
    }

    // attach properties directly to constructor function rather than prototype
    // won't have access to instances
    // provide additional ways to create instances
    // static methods are methods stored in a class's constructor, rather than its prototype
    static fromFahrenheit(value: number) {
        return new Temperature((value - 32) / 1.8);
    }
}
