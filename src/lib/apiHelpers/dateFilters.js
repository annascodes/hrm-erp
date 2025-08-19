export const startAndEndOfDay = (date) => {
    if (date && !isNaN(new Date(date).getTime())) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return { $gte: startOfDay, $lte: endOfDay };
    }else{
        return null;
    }
}


export const getLeaveDays = (start, end) => {

        const startTime = new Date(start).getTime()
        // e.g., new Date("2025-07-28T00:00:00.000Z").getTime()
        // Output: 1753660800000 (milliseconds since Jan 1, 1970)

        const endTime = new Date(end).getTime()
        // e.g., new Date("2025-08-02T00:00:00.000Z").getTime()
        // Output: 1754092800000

        const diffInMs = endTime - startTime
        // 1754092800000 - 1753660800000
        // Output: 432000000 milliseconds

        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
        // 432000000 / 86400000 (ms in a day)
        // Output: 5 days

        return diffInDays + 1 // +1 to include both start and end days
        // Output: 6
    }