import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Timer from "@/components/timer";
import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import Footer from "@/components/footer";
import MedicationIntakeStatus from "@/components/medication-intake-status";

export default function TabOneScreen() {
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
