export function byTagName(parentNode: HTMLElement, target: string) {
    target = target.toUpperCase();
    let result: (HTMLElement | ChildNode)[] = [];

    function explore(node: HTMLElement | ChildNode) {
        for (let i = 0; i < node.childNodes.length; i++) {
            let child = node.childNodes[i];

            // node type 1 === Node.ELEMENT_NODE
            if (child.nodeType === document.ELEMENT_NODE) {
                if (child.nodeName === target) {
                    result.push(child);
                }
                // we must loop over their children too
                explore(child);
            }
        }
    }

    explore(parentNode);
    return result;
}
