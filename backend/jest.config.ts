import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",

    moduleFileExtensions: ["ts", "js"],

    clearMocks: true,

    transform: {
        "^.+\\.ts$": ["ts-jest", { isolatedModules: true }],
    },
};

export default config;
