jest.spyOn(global.console, "log");

////////////////////////////////////
// `this` keyword
////////////////////////////////////

// When a function is called as a method—looked up as a property and immediately called,
// as in object.method()—the binding called `this` in its body
// automatically points at the object that it was called on
test("understand `this`", () => {
    function speak(line: string) {
        // @ts-ignore
        console.log(`${this.name} says ${line}`);
    }
    let person = { name: "Bob", speak: speak };
    person.speak("hi");
    expect(console.log).toHaveBeenCalledWith("Bob says hi");
});

test("understand `call` with `this`", () => {
    function speak(line: string) {
        // @ts-ignore
        console.log(`${this.name} says ${line}`);
    }
    let person = { name: "Bob", speak: speak };
    // Using call
    speak.call(person, "hi");
    expect(console.log).toHaveBeenCalledWith("Bob says hi");
});

// Since each function has its own `this` binding,
// whose value depends on the way it is called,
// you cannot refer to the `this` of the wrapping scope in a
// regular function defined with the function keyword.
test("understand scope of `this`", () => {
    function normalize() {
        // prettier-ignore
        // @ts-ignore -- map is called with function
        console.log(this.coords.map(function(n) {
            // @ts-ignore
            return n / this.length;
        }));
    }
    // Use bind here to not resolve: eg. x(), the method call and failing this test case
    expect(normalize.bind({ coords: [0, 2, 3], length: 5 })).toThrowError("Cannot read properties of undefined (reading 'length')");
    // this.coords could read the binding, but in function(n) inside map, it's reading its own `this` binding - undefined
});

// Arrow functions are different—they do not bind their own `this`
// but can see the `this` binding of the scope around them.
// Thus, you can do something like the following code, which references `this` from inside a local function
// arrow function () => () is the local function
test("understand scope of `this` in arrow function", () => {
    function normalize() {
        // @ts-ignore -- map is called with arrow function
        console.log(this.coords.map((n) => n / this.length));
    }
    normalize.call({ coords: [0, 2, 3], length: 5 });
    expect(console.log).toHaveBeenCalledWith([0, 0.4, 0.6]);
});

////////////////////////////////////
// Prototypes
////////////////////////////////////

test("entity behind almost all objects is `Object.prototype`", () => {
    console.log(Object.getPrototypeOf({ a: 1 }) === Object.prototype);
    expect(console.log).toHaveBeenCalledWith(true);

    console.log(Object.getPrototypeOf(Object.prototype));
    expect(console.log).toHaveBeenCalledWith(null);
});

test("objects are derived from other prototypes", () => {
    console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
    expect(console.log).toHaveBeenCalledWith(true);

    console.log(Object.getPrototypeOf([1, 2]) == Array.prototype);
    expect(console.log).toHaveBeenCalledWith(true);

    console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);
    expect(console.log).toHaveBeenCalledWith(true);
});

test("use Object.create to create an object with a specific prototype", () => {
    // all Bobs will have these properties
    let bobProto = {
        name: "Bob",
        speak: "I'm Bob",
    };

    // individual Bob will have prototype properties (speak) and
    // properties that only apply to itself (yell)
    let loudBob = Object.create(bobProto);
    expect(loudBob.speak).toBe("I'm Bob");

    // and we can add new properties to the
    loudBob.yell = "I'M BOB";
    expect(loudBob.yell).toBe("I'M BOB");

    let quietBob = Object.create(bobProto);
    expect(quietBob.yell).toBe(undefined);
});

////////////////////////////////////
// Class
////////////////////////////////////

// Class defines shape of an object: methods and properties
// Such object is called an instance of a class
// Constructor makes sure instance has properties of the class
test("constructor", () => {
    function makeRabbit(type: string) {
        let rabbit = Object.create({
            type,
            speak() {
                // @ts-ignore
                console.log(`The ${this.type} rabbit says "hi"`);
            },
        });
        return rabbit;
    }
    let blackRabbit = makeRabbit("black");
    expect(Object.getPrototypeOf(blackRabbit)).toEqual(expect.objectContaining({ type: "black" }));
});

// Using `new` "replaces" Object.creat(), and is recognized as constructor function
// Object with right prototype created, `this` is bound to the prototype in the function and returned
test("`new`", () => {
    function Rabbit(type: string) {
        // @ts-ignore
        this.type = type;
    }

    // In the function, `this` is bounded
    Rabbit.prototype.speak = function () {
        console.log(`The ${this.type} rabbit says "hi"`);
    };

    // @ts-ignore
    let blackRabbit = new Rabbit("black");
    blackRabbit.speak();
    expect(console.log).toHaveBeenCalledWith(`The black rabbit says "hi"`);

    // prototype is associated to constructor through prototype property (Object.prototype)
    // the actual prototype of constructor is Function.prototype, because it's a function
    expect(Object.getPrototypeOf(Rabbit)).toBe(Function.prototype);

    // Rabbit's prototype property holds the prototype used to create instances
    // Instance's prototype will be the object found in the prototype property of the constructor (Rabbit.prototype)
    expect(Object.getPrototypeOf(blackRabbit)).toBe(Rabbit.prototype);

    expect(blackRabbit instanceof Rabbit).toBeTruthy();
});

test("class constructor", () => {
    class Rabbit {
        readonly type: string;

        constructor(type: string) {
            this.type = type;
        }

        speak() {
            console.log(`The ${this.type} rabbit says "hi"`);
        }
    }

    let blackRabbit = new Rabbit("black");
    expect(Object.getPrototypeOf(blackRabbit)).toBe(Rabbit.prototype);

    expect(blackRabbit instanceof Rabbit).toBeTruthy();
});

////////////////////////////////////
// Maps
////////////////////////////////////

test("create objects with no prototype", () => {
    let x = Object.create(null);
    // as toString is in Object.prototype
    expect("toString" in x).toBeFalsy();
});

test("hasOwnProperty", () => {
    expect({ x: 1 }.hasOwnProperty("toString")).toBeFalsy();
});

test("misc on maps", () => {
    let people = new Map();
    people.set("Bob", "M");
    people.set("Sally", "F");
    expect(people.has("toString")).toBeFalsy();
    expect(people.has("Bob")).toBeTruthy();
    expect(people.get("Bob")).toBe("M");
});

////////////////////////////////////
// Polymorphism
////////////////////////////////////

test("polymorphism example: support `toString` interface", () => {
    class Rabbit {
        type: string;
        constructor(type: string) {
            this.type = type;
        }
    }

    Rabbit.prototype.toString = function () {
        return `a ${this.type} rabbit`;
    };

    let blackRabbit = new Rabbit("black");

    expect(String(blackRabbit)).toBe("a black rabbit");
    expect(String(blackRabbit)).not.toBe("[object Object]");
});

////////////////////////////////////
// Symbol
////////////////////////////////////

test("using symbol", () => {
    const toStringSymbol = Symbol("toString");
    // @ts-ignore
    Array.prototype[toStringSymbol] = function () {
        return `${this.length} cm of yarn`;
    };

    expect([1, 2].toString()).toBe("1,2");
    // @ts-ignore
    expect([1, 2][toStringSymbol]()).toBe("2 cm of yarn");
});

////////////////////////////////////
// Iterator
////////////////////////////////////

// Objects given to for/of loop is supposed to be iterable
// It has a method named with Symbol.iterator
// When called, it returns an interface called `iterator`: it has `next`, `value` and `done` property
test("using iterator", () => {
    let okIterator = "OK"[Symbol.iterator]();

    expect(okIterator.next()).toEqual({ done: false, value: "O" });
    expect(okIterator.next()).toEqual({ done: false, value: "K" });
    expect(okIterator.next()).toEqual({ done: true, value: undefined });
});
