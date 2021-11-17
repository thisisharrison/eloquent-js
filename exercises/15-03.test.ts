import userEvents from "@testing-library/user-event";

beforeEach(() => {
    document.body.innerHTML = `<tab-panel>
            <div data-tabname="one">Tab one</div>
            <div data-tabname="two">Tab two</div>
            <div data-tabname="three">Tab three</div>
        </tab-panel>`;
    require("./15-03.js");
});

test("tab panel", async () => {
    const buttons = document.querySelectorAll<HTMLButtonElement>("button");
    const panels = document.querySelectorAll<HTMLElement>("div[data-tabname]");
    await userEvents.click(buttons[1]);

    expect(buttons[1]!.style.color).toBe("red");
    expect(panels[0].style.display).toBe("none");
});
