export class InputError extends Error {}

/** Not using prompt for testing */
// export function promptDirection(question: string) {
export function promptDirection(result: string) {
    // let result: string = prompt(question) || "";
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
}
