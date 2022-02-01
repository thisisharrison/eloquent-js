document.addEventListener("DOMContentLoaded", function () {
    // create 12 nodes
    var dots = Array.from({ length: 12 }, function () {
        var node = document.createElement("div");
        node.className = "trail";
        document.body.appendChild(node);
        return node;
    });
    var currentDot = 0;
    window.addEventListener("mousemove", function (event) {
        // choose the next dot
        var dot = dots[currentDot];
        // get mouse position with pageX and Y and - 3
        dot.style.left = event.pageX - 3 + "px";
        dot.style.top = event.pageY - 3 + "px";
        // update dot position
        // next index % length to cycle through dots
        currentDot = (currentDot + 1) % dots.length;
    });
});
