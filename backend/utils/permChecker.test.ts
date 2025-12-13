import { validFileSync, writePossible } from "@/utils/permChecker";
import { expect, test } from "@jest/globals";
import { resolve } from "node:path";
import { DIR_NAME } from "@/constants";

test("validFileSync Check", () => {
    const validFile = resolve(
        DIR_NAME,
        "data",
        "template",
        "User_Register_Template.csv"
    );

    const invalidFile = resolve(DIR_NAME, "data", "Unknown", "i_am_here.txt");

    expect(validFileSync(validFile)).toBe(true);
    expect(validFileSync(invalidFile)).toBe(false);
});

test("writePossible Check", () => {
    const validFile = resolve(
        DIR_NAME,
        "data",
        "template",
        "User_Register_Template.csv"
    );

    const invalidFile = resolve(
        DIR_NAME,
        "data",
        "template",
        "User_Register_Template.idk"
    );

    expect(writePossible(validFile)).toBe(true);
    expect(writePossible(invalidFile)).toBe(true);
});
