import { expect, test } from "@jest/globals";
import { getLastDate } from "@/utils/lastDate";

test("lastDate Check (Same Month and Year)", () => {
    const endDate = new Date("15 Jan 2025");
    const startDate = getLastDate(10, endDate);

    const actualStartDate = new Date("05 Jan 2025");

    expect(startDate).toStrictEqual(actualStartDate);
});

test("lastDate Check (Same Year)", () => {
    const endDate = new Date("01 Feb 2025");
    const startDate = getLastDate(1, endDate);

    const actualStartDate = new Date("31 Jan 2025");

    expect(startDate).toStrictEqual(actualStartDate);
});

test("lastDate Check", () => {
    const endDate = new Date("15 Jan 2025");
    const startDate = getLastDate(15, endDate);

    const actualStartDate = new Date("31 Dec 2024");

    expect(startDate).toStrictEqual(actualStartDate);
});
