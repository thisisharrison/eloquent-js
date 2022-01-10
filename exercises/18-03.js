document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector("#board");
    const next = document.querySelector("#next");
    const run = document.querySelector("#run");

    const width = 30;
    const height = 15;

    let checkboxes = [];
    const boardElements = []

    for (let h = 0; h < height; h++) {
        let row = []
        for (let w = 0; w < width; w++) {
            let chance = Math.random() < 0.3
            const input = document.createElement("input")
            input.type = "checkbox"
            input.checked = chance
            board.appendChild(input)
            boardElements.push(input)
            row.push(chance)
        }
        checkboxes.push(row)
        board.appendChild(document.createElement("br"))
    }

    function isValid(x, y) {
        return x >= 0 && x < width && y >= 0 && y < height
    }

    function pos(x, y) {
        return checkboxes[y][x]
    }

    function countNeighbors(x, y) {
        const N = isValid(x, y - 1) ? pos(x, y - 1) ? 1 : 0 : 0
        const S = isValid(x, y + 1) ? pos(x, y + 1) ? 1 : 0 : 0
        const W = isValid(x - 1, y) ? pos(x - 1, y) ? 1 : 0 : 0
        const E = isValid(x + 1, y) ? pos(x + 1, y) ? 1 : 0 : 0
        const NW = isValid(x - 1, y - 1) ? pos(x - 1, y - 1) ? 1 : 0 : 0
        const NE = isValid(x + 1, y - 1) ? pos(x + 1, y - 1) ? 1 : 0 : 0
        const SW = isValid(x - 1, y + 1) ? pos(x - 1, y + 1) ? 1 : 0 : 0
        const SE = isValid(x + 1, y + 1) ? pos(x + 1, y + 1) ? 1 : 0 : 0
        return N + S + W + E + NW + NE + SW + SE
    }

    function generateCycle() {
        const checkboxes = []
        for (let h = 0; h < height; h++) {
            const row = []
            for (let w = 0; w < width; w++) {
                const prev = pos(w, h)
                const neighbors = countNeighbors(w, h)
                let checked = prev
                if (prev) {
                    // Any live cell with fewer than two or more than three live neighbors dies.
                    checked = neighbors < 2 || neighbors > 3 ? false : true
                    // Any live cell with two or three live neighbors lives on to the next generation.
                    checked = neighbors == 2 || neighbors == 3 ? true : false
                } else {
                    // Any dead cell with exactly three live neighbors becomes a live cell.
                    if (neighbors === 3) {
                        checked = true
                    }
                }
                row.push(checked)
            }
            checkboxes.push(row)
        }
        return checkboxes
    }

    function checkTheseBoxes(checkboxes) {
        checkboxes.flatMap(x => x).forEach((bool, i) => {
            boardElements[i].checked = bool
        })
    }

    function newCycle() {
        const newCheck = generateCycle()
        checkTheseBoxes(newCheck)
        checkboxes = newCheck
    }

    let intervalID = null

    next.addEventListener("click", () => newCycle())
    run.addEventListener("click", () => {
        if (!intervalID) {
            run.innerText = "Pause"
            next.disabled = true
            intervalID = setInterval(() => {
                newCycle()
            }, 1000);
        } else {
            run.innerText = "Auto Run"
            next.disabled = false
            clearTimeout(intervalID)
            intervalID = null
        }
    })
})
