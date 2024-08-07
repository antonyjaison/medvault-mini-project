export function getNextTimeInMilliseconds(times) {
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


export function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good evening";
    } else {
        return "Good night";
    }
}