function asTabs(node: ParentNode) {
    // cannot use childNodes because buttons will be added as it is a live data structure
    // also children can ignore text nodes
    const collection = Array.from(node.children).map((node) => {
        const name = node.getAttribute("data-tabname");
        const button = document.createElement("button");
        button.textContent = name;
        let tab = { node, button } as { node: HTMLElement; button: HTMLButtonElement };
        button.addEventListener("click", () => selectTab(tab));
        return tab;
    });

    const tabs = document.createElement("div");
    collection.forEach((_) => tabs.appendChild(_.button));
    node.insertBefore(tabs, node.firstChild);

    function selectTab(selectedTab: { node: HTMLElement; button: HTMLButtonElement }) {
        for (let tab of collection) {
            let selected = tab === selectedTab;
            tab.button.style.color = selected ? "red" : "";
            tab.node.style.display = selected ? "" : "none";
        }
    }
    selectTab(collection[0]);
}

asTabs(document.querySelector("tab-panel")!);
