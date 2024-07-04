export function getNextTimeInMilliseconds(times: string[]) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    let nextTimeInMinutes = Infinity;

    for (let time of times) {
        const [hour, minute] = time.split(':').map(Number);
        const timeInMinutes = hour * 60 + minute;

        if (timeInMinutes > currentTimeInMinutes) {
            nextTimeInMinutes = Math.min(nextTimeInMinutes, timeInMinutes);
        }
    }

    // If no upcoming time is found for today, take the earliest time for the next day
    if (nextTimeInMinutes === Infinity) {
        const [hour, minute] = times[0].split(':').map(Number);
        nextTimeInMinutes = hour * 60 + minute + 24 * 60; // Add 24 hours to account for the next day
    }

    const nextTimeHour = Math.floor(nextTimeInMinutes / 60);
    const nextTimeMinute = nextTimeInMinutes % 60;

    const nextTime = new Date(now);
    nextTime.setHours(nextTimeHour, nextTimeMinute, 0, 0);

    if (nextTime < now) {
        nextTime.setDate(nextTime.getDate() + 1);
    }

    return nextTime - now;
}