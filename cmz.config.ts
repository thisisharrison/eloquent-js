import { defineConfig } from "@shad02w/cmz";

export default defineConfig({
    commitTypes: [
        {
            name: "exercise",
            description: "complete new exercises",
        },
        {
            name: "review",
            description: "review exercises",
        },
        {
            name: "refactor",
            description: "refactor exercises",
        },
        {
            name: "fix",
            description: "bug fix",
        },
        {
            name: "upgrade",
            description: "dependencies update and change",
        },
        {
            name: "chore",
            description: "add dependencies or update configs",
        },
    ],
    // Final commit message reolve to
    resolve: ({ commitType, message }) => `${commitType.name}: ${message}`,
});
