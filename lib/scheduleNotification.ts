import { PrescriptionType } from "./prescription";
import * as Notifications from 'expo-notifications';

export const scheduleNotifications = async (prescriptions: PrescriptionType[]) => {
    prescriptions.forEach((prescription, index) => {
        prescription.times?.forEach((time, index) => {
            const [hour, minute] = time.split(':').map(Number);
            const now = new Date();
            const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

            if (notificationTime < now) {
                // If the time has already passed for today, schedule for tomorrow
                notificationTime.setDate(notificationTime.getDate() + 1);
            }
        });
    })
}