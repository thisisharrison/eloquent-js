import userEvents from "@testing-library/user-event";

beforeEach(() => {
    document.body.innerHTML = `<p style="font-size: 18px">🎈</p>`;
    require("./15-01.js");
});

test("balloon", async () => {
    const b = document.querySelector("p");
    let orig = b!.style.fontSize;
    await userEvents.keyboard("{arrowUp}");
    expect(b!.style.fontSize).not.toBe(orig);

    await userEvents.keyboard("{arrowUp}{arrowUp}{arrowUp}");
    expect(document.querySelector("p")?.innerText).toBe("💥");
});
