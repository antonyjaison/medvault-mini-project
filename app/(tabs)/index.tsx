import { useEffect, useState, useRef } from "react";
import { Button, Platform, ScrollView, Text, View } from "react-native";
import Timer from "@/components/timer";
import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import Footer from "@/components/footer";
import MedicationIntakeStatus from "@/components/medication-intake-status";
import AlertButton from "@/components/alert-button";
import { useDocuments } from "@/store/useDocuments";
import addTimingsToPrescriptions from "@/lib/prescription";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useUser } from "@/store/userStore";
import { Redirect } from "expo-router";

export default function TabOneScreen() {
  const { prescriptions } = useDocuments();
  const [totalPrescriptions, setTotalPrescriptions] = useState([]);
  const [processedPrescriptions, setProcessedPrescriptions] = useState([]);
  const { user, name } = useUser();

  const timerGradient = [
    { color: "#6d9cf4", percentage: 50 },
    { color: "#1A4CD3", percentage: 100 },
  ];

  const initialTime = Date.now();
  const finalTime = initialTime + 60 * 1000;

  const [currentTime, setCurrentTime] = useState(initialTime);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      setCurrentTime(now);
      const timeLeft = Math.max(finalTime - now, 0);
      const totalDuration = finalTime - initialTime;
      const timeElapsed = now - initialTime;
      const newPercentage = (timeElapsed / totalDuration) * 100;

      setPercentage(Math.min(newPercentage, 100));

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        setTimeRemaining("00 : 00 : 00");
        setPercentage(100);
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const allPrescriptions = prescriptions.flatMap(prescription => prescription.prescriptionData);
    setTotalPrescriptions(allPrescriptions);
    console.log("Total Prescriptions:", allPrescriptions); // Logging prescriptions data
  }, [prescriptions]);

  useEffect(() => {
    const prescriptionsWithTime = addTimingsToPrescriptions(totalPrescriptions);
    setProcessedPrescriptions(prescriptionsWithTime);
    console.log("Processed Prescriptions:", prescriptionsWithTime); // Logging processed prescriptions
  }, [totalPrescriptions]);

  useEffect(() => {
    const scheduleNext24Hours = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      processedPrescriptions.forEach((prescription, prescriptionIndex) => {
        prescription.times.forEach((time, timeIndex) => {
          const [hour, minute] = time.split(':').map(Number);
          let notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

          if (notificationTime < now) {
            notificationTime.setDate(notificationTime.getDate() + 1);
          }

          if (notificationTime < tomorrow) {
            console.log(`Prescription Index: ${prescriptionIndex}, Time Index: ${timeIndex}, Notification Time: ${notificationTime}`);
            schedulePushNotification(prescription.Medicine, prescription.dose, notificationTime);
          }
        });
      });
    };

    scheduleNext24Hours();
    const intervalId = setInterval(scheduleNext24Hours, 24 * 60 * 60 * 1000); // Reschedule every 24 hours

    return () => clearInterval(intervalId);
  }, [processedPrescriptions]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification(medicine, dose, notificationTime) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medication Reminder",
          body: `Time to take your medicine: ${medicine} - ${dose}`,
        },
        trigger: { date: notificationTime },
      });
      console.log("Scheduled notification for:", medicine, dose, notificationTime);
    } catch (error) {
      console.error("Failed to schedule the notification:", error);
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  console.log("User:", name); // Debug log

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <ScrollView>
        <Button title="Press to schedule a notification" onPress={() => {
          const now = new Date();
          const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 48, 0); // 20:42 is 8:42 PM
          console.log("Setting notification for 20:42:", notificationTime); // Debug log

          schedulePushNotification("Medicine", "Dose", notificationTime);
        }} />
        <View style={{ gap: 34 }} className="h-full bg-[#16161A] w-full px-4 flex-col py-4">
          <View className="bg-transparent w-full items-center">
            <View className="relative bg-transparent justify-center items-center">
              <Timer
                radius={80}
                percentage={percentage}
                strokeWidth={16}
                circleWidth={200}
                gradient={timerGradient}
                backgroundStrokeColor="none"
              />
              <View className="bg-transparent absolute">
                <Text className="text-white font-bold text-xl">{timeRemaining}</Text>
              </View>
            </View>
            <Text className="text-white text-lg font-medium mt-4">Time for Next Medication</Text>
          </View>
          <MedicationIntakeStatus />
          <DocumentsSection />
          <InsightSection />
          <Footer />
        </View>
      </ScrollView>
      {/* <AlertButton /> */}
    </View>
  );
}
