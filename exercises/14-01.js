var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];
function elt(type, style) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var node = document.createElement(type);
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        if (typeof child !== "string") {
            // another elt
            node.appendChild(child);
        }
        else {
            // text
            node.appendChild(document.createTextNode(child));
            // for height
            if (style !== undefined) {
                node.style.textAlign = Object.values(style)[0];
            }
        }
    }
    return node;
}
var headers = elt.apply(void 0, __spreadArray(["tr", undefined], Object.keys(MOUNTAINS[0]).map(function (head) { return elt("th", undefined, head); }), false));
var data = MOUNTAINS.map(function (_) {
    return elt("tr", undefined, elt("td", undefined, _.name), elt("td", { textAlign: "right" }, "" + _.height), elt("td", undefined, _.place));
});
document.getElementById("mountains").appendChild(elt.apply(void 0, __spreadArray(["table", undefined, headers], data, false)));
