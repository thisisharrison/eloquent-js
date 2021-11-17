var balloon = document.querySelector("p");
var originalSize = +/(\d+)/.exec(balloon.style.fontSize)[0];
window.addEventListener("keydown", handleArrow);
function handleArrow(event) {
    var fontSize = +/(\d+)/.exec(balloon.style.fontSize)[0];
    if (event.key === "ArrowUp" || event.key === "Up") {
        var newFontSize = fontSize * 2;
        setSize(balloon, newFontSize);
        event.preventDefault();
        if (newFontSize / originalSize > 3) {
            balloon.innerText = "💥";
            window.removeEventListener("keydown", handleArrow);
        }
    }
    else if (event.key === "ArrowDown" || event.key === "Down") {
        setSize(balloon, fontSize / 2);
        event.preventDefault();
    }
}
function setSize(balloon, newSize) {
    balloon.style.fontSize = newSize + "px";
}
