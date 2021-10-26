type PositiveNumber<N extends number> = number extends N ? never : `${N}` extends `-${string}` | `${string}.${string}` ? never : N;

export default function isEven<N extends number>(a: PositiveNumber<N>): boolean {
    function recurEven(a: number): boolean {
        if (a === 1) {
            return false;
        } else if (a === 0) {
            return true;
        } else if (a < 0) {
            return recurEven(-a);
        } else {
            return recurEven(a - 2);
        }
    }
    return recurEven(a);
}
