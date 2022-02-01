beforeEach(() => {
    document.body.innerHTML = `
            <h1>Mountains</h1>
            <div id="mountains"></div>
            `;
    require("./14-01.js");
});

test("table", () => {
    const div = document.getElementById("mountains");
    expect(div?.innerHTML).toEqual(
        expect.stringContaining(
            `
    <table>
    <tr>
        <th>name</th>
        <th>height</th>
        <th>place</th>
    </tr>
    <tr>
        <td>Kilimanjaro</td>
        <td style="text-align: right;">5895</td>
        <td>Tanzania</td>
    </tr>
    `.replace(/(^(\s)*|\n)/gm, "")
        )
    );
});

test("text align right", () => {
    const tds = Array.from(document.querySelectorAll("td"));

    for (const td of tds) {
        if (typeof +td.innerHTML === "number") {
            console.log(`td.style.textAlign`, td.style.textAlign);
            expect(td.style.textAlign).toBe("right");
        }
    }
});
