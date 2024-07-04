import * as Notifications from 'expo-notifications';

export async function getScheduledNotifications() {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log(scheduledNotifications);
    return scheduledNotifications;
}

export const cancelAllScheduledNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All scheduled notifications have been cancelled');
};
