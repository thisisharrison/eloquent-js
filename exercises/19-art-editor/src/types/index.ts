import Picture from "../components/Picture";

export interface State {
    picture: Picture;
    tool: string;
    colour: string;
    done: any[];
    doneAt: number;
}

// Does not need ... { [K in keyof State]: State[K] }, just use Partial
export type Dispatch = (arg: Partial<State>) => void;

export interface Pixel {
    x: number;
    y: number;
    colour: string;
}

export interface Position {
    x: number;
    y: number;
}

export type Callback = (pos: Position, state?: State) => Callback | undefined;

export interface Config {
    tools: Tools;
    controls: any;
    dispatch: Dispatch;
}

type ToolFn = (position: Position, state: State, dispatch: Dispatch) => Callback | undefined;

export type Tools = {
    [key: string]: ToolFn;
};

export abstract class Component {
    abstract syncState(state: State): void;
}
