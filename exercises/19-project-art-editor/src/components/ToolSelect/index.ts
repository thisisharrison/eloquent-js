import { Utils } from "../../utils";
import { Component, Dispatch, State, Tools } from "../../types";

export default class ToolSelect implements Component {
    select: HTMLSelectElement;
    dom: HTMLLabelElement;

    constructor(state: State, { tools, dispatch }: { tools: Tools; dispatch: Dispatch }) {
        this.select = Utils.render(
            "select",
            {
                onchange: () => dispatch({ tool: this.select.value }),
            },
            ...Object.keys(tools).map((name) =>
                Utils.render(
                    "option",
                    {
                        selected: name == state.tool,
                    },
                    name
                )
            )
        );
        this.dom = Utils.render("label", null, "🖌 Tool: ", this.select);
    }

    syncState(state: State) {
        this.select.value = state.tool;
    }
}
