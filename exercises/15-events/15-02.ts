document.addEventListener("DOMContentLoaded", () => {
    // create 12 nodes
    const dots: HTMLDivElement[] = Array.from({ length: 12 }, () => {
        let node = document.createElement("div");
        node.className = "trail";
        document.body.appendChild(node);
        return node;
    });

    let currentDot = 0;

    window.addEventListener("mousemove", (event) => {
        // choose the next dot
        let dot = dots[currentDot];
        // get mouse position with pageX and Y and - 3
        dot.style.left = event.pageX - 3 + "px";
        dot.style.top = event.pageY - 3 + "px";
        // update dot position
        // next index % length to cycle through dots
        currentDot = (currentDot + 1) % dots.length;
    });
});
