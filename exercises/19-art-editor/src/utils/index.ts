import { State } from "../types";

// props: attribute like properties and event handlers
function render<K extends keyof HTMLElementTagNameMap>(type: K, props: any, ...children: (string | Node)[]) {
    let dom = document.createElement(type);
    if (props) {
        Object.assign(dom, props);
    }
    for (let child of children) {
        if (typeof child != "string") {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}

function updateState(state: State, action: any) {
    return Object.assign({}, state, action);
}

export const Utils = Object.freeze({
    render,
    updateState,
});
