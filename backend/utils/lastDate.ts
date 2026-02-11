/**
 * Returns the date, `days` days ago.
 * Eg: days = 15, returns the date 15 days ago
 */
export function getLastDate(days: number, date?: Date) {
    const current = date || new Date();
    
    current.setDate(current.getDate() - days);

    return current;
}
