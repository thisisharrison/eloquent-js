// TODO better type
export default function flatten(array: any[]) {
    return array.reduce((flat, cur) => flat.concat(cur), []);
}
