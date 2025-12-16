/**
 * Returns the date, `days` days ago.
 * Eg: days = 15, returns the date 15 days ago
 */
export function getLastDate(days: number, date?: Date) {
    const current = date || new Date();
    const currentYear = current.getFullYear(),
        currentMonth = current.getMonth(),
        currentDate = current.getDate() - days;

    return new Date(currentYear, currentMonth, currentDate);
}
