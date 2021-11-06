import { VillageState } from "./07-village";

describe("move", () => {
    let first = new VillageState("Post Office", [{ place: "Post Office", address: "Alice's House" }]);
    let next = first.move("Alice's House");

    test("should move robot to next place", () => {
        expect(next.robotPosition).toBe("Alice's House");
    });

    test("should delivery all parcels", () => {
        expect(next.parcels).toEqual([]);
    });

    // states should be immutable or persistent.
    // they behave a lot like strings and numbers in that they are who they are
    // and stay that way,
    // rather than containing different things at different times
    // why? because it's complexity management.
    // operations are isolated: moving to Alice's house from a given start always products the same state
    test("should keep old state intact", () => {
        expect(first.robotPosition).toBe("Post Office");
    });
});

describe("initializeVillage", () => {
    let village = VillageState.initializeVillage();

    test("parcels amount", () => {
        expect(village.parcels.length).toBe(5);
    });

    test("robot starting position", () => {
        expect(village.robotPosition).toBe("Post Office");
    });

    test("parcel's place and address are non-identical", () => {
        for (let { place, address } of village.parcels) {
            expect(place).not.toBe(address);
        }
    });
});
