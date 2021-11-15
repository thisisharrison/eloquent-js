const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

function elt(type: keyof HTMLElementTagNameMap, style?: Partial<CSSStyleDeclaration>, ...children: any) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child !== "string") {
            // another elt
            node.appendChild(child);
        } else {
            // text
            node.appendChild(document.createTextNode(child));
            // for height
            if (style !== undefined) {
                node.style.textAlign = Object.values(style)[0] as string;
            }
        }
    }
    return node;
}

const headers = elt("tr", undefined, ...Object.keys(MOUNTAINS[0]).map((head) => elt("th", undefined, head)));

const data = MOUNTAINS.map((_) => {
    return elt("tr", undefined, elt("td", undefined, _.name), elt("td", { textAlign: "right" }, `${_.height}`), elt("td", undefined, _.place));
});

document.getElementById("mountains")!.appendChild(elt("table", undefined, headers, ...data));
