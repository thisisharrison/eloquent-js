import { Component, Dispatch, State } from "../../types";
import { Utils } from "../../utils";

export default class ColourSelect implements Component {
    input: HTMLInputElement;
    dom: HTMLLabelElement;

    constructor(state: State, { dispatch }: { dispatch: Dispatch }) {
        this.input = Utils.render("input", {
            type: "color",
            value: state.colour,
            onchange: () => dispatch({ colour: this.input.value }),
        });
        this.dom = Utils.render("label", null, "🎨 Color: ", this.input);
    }

    syncState(state: State) {
        this.input.value = state.colour;
    }
}
