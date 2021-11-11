export default class Group {
    content: any[];

    constructor() {
        this.content = [];
    }

    add(n: any) {
        !this.has(n) ? this.content.push(n) : undefined;
    }

    delete(n: any) {
        if (this.has(n)) {
            this.content = this.content.filter((_, i) => _ !== n);
        }
    }

    has(n: any) {
        return this.indexOf(n) === -1 ? false : true;
    }

    indexOf(n: any) {
        return this.content.findIndex((_) => _ === n);
    }

    empty() {
        return this.content.length === 0;
    }

    getIndex(n: any) {
        return this.content[n];
    }

    get length() {
        return this.content.length;
    }

    // [Symbol.iterator]() {
    //     return new GroupIterator(this);
    // }

    static from(iterable: any[]) {
        let result = new Group();
        for (const item of iterable) {
            result.add(item);
        }
        return result;
    }
}

// @ts-ignore -- using generator function
Group.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this.content.length; i++) {
        yield this.content[i] 
    }
}

class GroupIterator {
    group: Group;
    index: number;

    constructor(group: Group) {
        this.group = group;
        this.index = 0;
    }

    next() {
        if (this.group.empty()) return { done: true };
        if (this.group.length === this.index) return { done: true };
        let value = this.group.getIndex(this.index);
        this.index++;
        return { value, done: false };
    }
}
