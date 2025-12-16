import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",

    testEnvironment: "node",

    moduleFileExtensions: ["ts", "js"],

    maxWorkers: 4,

    clearMocks: true,

    transform: {
        "^.+\\.ts$": "ts-jest",
    },

    moduleNameMapper: {
        "@/(.*)": "<rootDir>/$1",
    },
};

export default config;
