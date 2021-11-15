"use strict";
exports.__esModule = true;
exports.byTagName = void 0;
function byTagName(parentNode, target) {
    target = target.toUpperCase();
    var result = [];
    function explore(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
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
exports.byTagName = byTagName;
