import { Utils } from "../../utils";
import { Config, State } from "../../types";
import PictureCanvas from "../PictureCanvas";

export default class PixelEditor {
    state: State;
    canvas: PictureCanvas;
    controls: any;
    dom: HTMLDivElement;

    constructor(state: State, config: Config) {
        let { tools, controls, dispatch } = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, (pos) => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) {
                return (pos) => onMove!(pos, this.state);
            }
        });

        this.controls = controls.map((Control: any) => new Control(state, config));

        this.dom = Utils.render("div", {}, this.canvas.dom, Utils.render("br", {}), ...this.controls.reduce((a: any, c: any) => a.concat(" ", c.dom), []));
    }

    syncState(state: State) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) {
            ctrl.syncState(state);
        }
    }
}
