export default class PGroup {
    private readonly members: any[];

    // TODO: review and strong type
    // need only one empty instance because all empty groups are the same
    //  and instances of the class don’t change.
    // can create many different groups from empty group without affecting it.
    static empty = new PGroup([]);

    constructor(members: any[]) {
        this.members = members;
    }

    add(n: any) {
        if (this.has(n)) {
            return this;
        } else {
            return new PGroup(this.members.concat([n]));
        }
    }

    delete(n: any) {
        if (!this.has(n)) {
            return this;
        } else {
            return new PGroup(this.members.filter((_) => _ !== n));
        }
    }

    has(n: any) {
        return this.members.includes(n);
    }
}
