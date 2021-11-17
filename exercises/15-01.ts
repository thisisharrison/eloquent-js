const balloon = document.querySelector("p");
const originalSize = +/(\d+)/.exec(balloon!.style.fontSize)![0];
window.addEventListener("keydown", handleArrow);

function handleArrow(event: KeyboardEvent) {
    const fontSize = +/(\d+)/.exec(balloon!.style.fontSize)![0];
    if (event.key === "ArrowUp" || event.key === "Up") {
        const newFontSize = fontSize * 2;
        setSize(balloon!, newFontSize);
        event.preventDefault();

        if (newFontSize / originalSize > 3) {
            balloon!.innerText = "💥";
            window.removeEventListener("keydown", handleArrow);
        }
    } else if (event.key === "ArrowDown" || event.key === "Down") {
        setSize(balloon!, fontSize / 2);
        event.preventDefault();
    }
}

function setSize(balloon: HTMLElement, newSize: number) {
    balloon.style.fontSize = `${newSize}px`;
}
