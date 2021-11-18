import { GAME_LEVELS } from "./game-levels";
import { Level } from "./level";
import { DOMDisplay } from "./dom-display";
import { State } from "./state";
import { arrowKeys } from "./shared";

/**
 * . empty space
 * # characters are walls
 * + signs are lava
 * @ player’s starting position is the at sign
 * o a coin
 * = a block of lava that moves back and forth horizontally
 * | vertically moving blobs
 * v indicates dripping lava—vertically moving lava, only moves down, jumping back to its start position when it hits the floor.
 */

// wrapper of requestAnimationFrame so that we don't have to track time and call requestAnimationFrame again after every frame
function runAnimation(frameFunc: (timeStep: number) => boolean) {
    let lastTime: number | null = null;
    function frame(time: number) {
        if (lastTime !== null) {
            // maximum frame step of 100ms
            // requestAnimation is suspended if tab or window is hidden, this prevents huge step difference
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            // stops animation when frameFunc returns false
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function runLevel(level: Level, Display: any, lives: number) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running: "yes" | "no" | "pausing" = "yes";
    return new Promise((resolve) => {
        function escHandler(event: KeyboardEvent) {
            if (event.key !== "Escape") return;
            event.preventDefault();
            if (running === "no") {
                running = "yes";
                runAnimation(frame);
            } else if (running === "yes") {
                running = "pausing";
            } else {
                running = "yes";
            }
        }

        window.addEventListener("keydown", escHandler);

        function frame(time: number) {
            if (running === "pausing") {
                running = "no";
                return false;
            }
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status === "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                window.removeEventListener("keydown", escHandler);
                if (lives === 0) arrowKeys.unregister();
                resolve(state.status);
                return false;
            }
        }
        runAnimation(frame);
    });
}

async function runGame(plans: string[], Display: any) {
    let lives = 3;
    for (let level = 0; level < plans.length; ) {
        console.log(`Level ${level + 1}, lives: ${lives}`);
        let status = await runLevel(new Level(plans[level]), Display, lives);
        if (status === "won") {
            level++;
        } else {
            lives--;
        }
    }
    if (lives > 0) {
        console.log("You've won!");
    } else {
        console.log("Game over");
    }
}

runGame(GAME_LEVELS, DOMDisplay);
