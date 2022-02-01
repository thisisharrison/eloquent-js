beforeEach(() => {
    document.body.innerHTML = `
    <h1>Heading with a <span>span</span> element.</h1>
    <p>A paragraph with <span>one</span>, <span>two</span>
    spans.</p>
    `;
});

test("elements by tag name", () => {
    const { byTagName } = require("./14-02.js");
    expect(byTagName(document.body, "h1").length).toBe(1);
    expect(byTagName(document.body, "span").length).toBe(3);
    let para = document.querySelector("p");
    expect(byTagName(para, "span").length).toBe(2);
});
