import { validFileSync } from "./permChecker";
import { expect, test } from "@jest/globals";
import { resolve } from "node:path";
import { DIR_NAME } from "../constants";

const validFile = resolve(
    DIR_NAME,
    "data",
    "template",
    "User_Register_Template.csv"
);

const invalidFile = resolve(DIR_NAME, "data", "Unknown", "i_am_here.txt");

test("validFileSync Check", () => {
    expect(validFileSync(validFile)).toBe(true);
    expect(validFileSync(invalidFile)).toBe(false);
});
