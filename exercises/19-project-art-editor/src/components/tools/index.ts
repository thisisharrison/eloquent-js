import { Dispatch, Position, State } from "../../types";

export function draw(pos: Position, state: State, dispatch: Dispatch) {
    function drawPixel({ x, y }: Position, state: State) {
        let drawn = { x, y, colour: state.colour };
        dispatch({ picture: state.picture.draw([drawn]) });
    }
    drawPixel(pos, state);
    return drawPixel;
}

export function rectangle(start: Position, state: State, dispatch: Dispatch) {
    function drawRectangle(pos: Position) {
        let xStart = Math.min(start.x, pos.x);
        let yStart = Math.min(start.y, pos.y);
        let xEnd = Math.max(start.x, pos.x);
        let yEnd = Math.max(start.y, pos.y);
        let drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({ x, y, colour: state.colour });
            }
        }
        dispatch({ picture: state.picture.draw(drawn) });
    }
    drawRectangle(start);
    return drawRectangle;
}

const around = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
];

export function fill({ x, y }: Position, state: State, dispatch: Dispatch) {
    let targetColor = state.picture.pixel(x, y);
    let drawn = [{ x, y, colour: state.colour }];
    for (let done = 0; done < drawn.length; done++) {
        for (let { dx, dy } of around) {
            let x = drawn[done].x + dx,
                y = drawn[done].y + dy;
            if (x >= 0 && x < state.picture.width && y >= 0 && y < state.picture.height && state.picture.pixel(x, y) == targetColor && !drawn.some((p) => p.x == x && p.y == y)) {
                drawn.push({ x, y, colour: state.colour });
            }
        }
    }
    dispatch({ picture: state.picture.draw(drawn) });
}

export function pick(pos: Position, state: State, dispatch: Dispatch) {
    dispatch({ colour: state.picture.pixel(pos.x, pos.y) });
}
