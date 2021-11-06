export class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a: number, b: number) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

export function reliableMultiply(a: number, b: number) {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.log("not this time");
            } else {
                throw e;
            }
        }
    }
}
