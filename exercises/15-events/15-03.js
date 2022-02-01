function asTabs(node) {
    // cannot use childNodes because buttons will be added as it is a live data structure
    // also children can ignore text nodes
    var collection = Array.from(node.children).map(function (node) {
        var name = node.getAttribute("data-tabname");
        var button = document.createElement("button");
        button.textContent = name;
        var tab = { node: node, button: button };
        button.addEventListener("click", function () { return selectTab(tab); });
        return tab;
    });
    var tabs = document.createElement("div");
    collection.forEach(function (_) { return tabs.appendChild(_.button); });
    node.insertBefore(tabs, node.firstChild);
    function selectTab(selectedTab) {
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var tab = collection_1[_i];
            var selected = tab === selectedTab;
            tab.button.style.color = selected ? "red" : "";
            tab.node.style.display = selected ? "" : "none";
        }
    }
    selectTab(collection[0]);
}
asTabs(document.querySelector("tab-panel"));
