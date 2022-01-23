import ColourSelect from "./components/ColourSelect";
import Picture from "./components/Picture";
import PixelEditor from "./components/PixelEditor/indext";
import { draw, fill, pick, rectangle } from "./components/tools";
import ToolSelect from "./components/ToolSelect";
import { State, Tools } from "./types";
import { Utils } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
    let state: State = {
        tool: "draw",
        colour: "#000000",
        picture: Picture.empty(60, 30, "#f0f0f0"),
        done: [],
        doneAt: 0,
    };
    let app = new PixelEditor(state, {
        tools: { draw, fill, rectangle, pick } as Tools,
        controls: [ToolSelect, ColourSelect],
        dispatch(action) {
            state = Utils.updateState(state, action);
            app.syncState(state);
        },
    });

    document.querySelector("div")!.appendChild(app.dom);
});
