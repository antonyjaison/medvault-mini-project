import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Timer from "@/components/timer";
import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import Footer from "@/components/footer";
import MedicationIntakeStatus from "@/components/medication-intake-status";
import auth from '@react-native-firebase/auth';
import { useDocuments } from "@/store/useDocuments";
import { useUser } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications";

export default function TabOneScreen() {
  const { setUser } = useUser()
  useEffect(() => {
    setUser(
      { "displayName": "", "email": "antonyjaison639@gmail.com", "phoneNumber": "", "photoURL": "", "providerId": "firebase", "tenantId": "", "uid": "mHScIgQc0AOTRmzVKqlQ0ApKJun1" }
    )
  }, [])
  const prescriptions = [
    {
      Medicine: "Aspirin",
      dose: "500mg",
      frequency: 2,
      remarks: "Take after meals"
    },
    {
      Medicine: "Loratadine",
      dose: "10mg",
      frequency: 1,
      remarks: "Take once daily"
    },
    {
      Medicine: "Amoxicillin",
      dose: "250mg",
      frequency: 3,
      remarks: "Take with plenty of water"
    }
  ];
  const timer = () => {
    const [TimeRemaining, settimeRemaining] = useState(0);
    const [Medicine, setMedicine] = useState("");
  
    useEffect(() => {
      function getPrescriptions() {
        let minTime = Infinity;
        let nextMedicine = "";
  
        prescriptions.forEach((prescription) => {
          const { Medicine, frequency } = prescription;
          const timeDifference = getTimeDifference(frequency);
          
          if (timeDifference < minTime) {
            minTime = timeDifference;
            nextMedicine = Medicine;
          }
        });
  
        setMedicine(nextMedicine);
        settimeRemaining(minTime === Infinity ? 0 : minTime);
      }
  
      getPrescriptions();
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        settimeRemaining((prevTime) => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          if (newTime === 0) {
            scheduleNotification(); // Call to schedule the notification
          }
          return newTime;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [TimeRemaining]);
  
    async function scheduleNotification() {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time for Next Medication",
          body: `It's time to take ${Medicine}.`,
        },
        trigger: { seconds: 2 }, // Trigger immediately for demonstration purposes
      });
    }
  
    function getTimeDifference(freq : number) {
      const now = dayjs();
      if (freq === 1) {
        const next10AM = dayjs().hour(10).minute(0).second(0);
        if (now.isAfter(next10AM)) {
          return next10AM.add(1, "day").diff(now, "second");
        } else {
          return next10AM.diff(now, "second");
        }
      }
      if (freq === 2) {
        const next10AM = dayjs().hour(10).minute(0).second(0);
        const next8PM = dayjs().hour(20).minute(0).second(0);
        if (now.isAfter(next10AM) && now.isBefore(next8PM)) {
          return next8PM.diff(now, "second");
        } else {
          return next10AM.add(1, "day").diff(now, "second");
        }
      }
      if (freq === 3) {
        const next10AM = dayjs().hour(10).minute(0).second(0);
        const next2PM = dayjs().hour(14).minute(0).second(0);
        const next8PM = dayjs().hour(20).minute(19).second(0);
        if (now.isAfter(next10AM) && now.isBefore(next2PM)) {
          return next2PM.diff(now, "second");
        } else if (now.isAfter(next2PM) && now.isBefore(next8PM)) {
          return next8PM.diff(now, "second");
        } else {
          return next10AM.add(1, "day").diff(now, "second");
        }
      }
      return 0;
    }
  
    // Calculate hours, minutes, and seconds from timeRemaining.
    const hours = Math.floor(TimeRemaining / 3600);
    const minutes = Math.floor((TimeRemaining / 60) % 60);
    const seconds = TimeRemaining % 60;
  }
  
  

  const timerGradient = [
    { color: "#6d9cf4", percentage: 50 },
    { color: "#1A4CD3", percentage: 100 },
  ];


  // Set the finalTime to 5 hours from the initial render time
  const initialTime = Date.now();
  const finalTime = initialTime + 60 * 1000; // 5 hours from now

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

      setPercentage(Math.min(newPercentage, 100)); // Ensure percentage does not exceed 100%

      // Format time left as hh:mm:ss
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        setTimeRemaining("00 : 00 : 00");
        setPercentage(100); // Set to 100% when time is up
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  

  return (
    <ScrollView>
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
  );
}
